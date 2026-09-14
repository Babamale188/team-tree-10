import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const SIGNED_URL_EXPIRY = 3600; // 1 hour
const cache = new Map<string, { url: string; expiresAt: number }>();

/**
 * Extract the storage object path from a full Supabase public URL.
 * e.g. "https://xyz.supabase.co/storage/v1/object/public/profile-photos/abc.jpg" → "abc.jpg"
 */
function extractStoragePath(photoUrl: string): string | null {
  try {
    const marker = "/profile-photos/";
    const idx = photoUrl.indexOf(marker);
    if (idx === -1) return null;
    return photoUrl.substring(idx + marker.length);
  } catch {
    return null;
  }
}

/**
 * Returns a signed URL for a profile photo stored in the private bucket.
 * Caches signed URLs in memory to avoid redundant requests.
 */
export function useSignedUrl(photoUrl: string | null | undefined): string | null {
  const [signedUrl, setSignedUrl] = useState<string | null>(() => {
    if (!photoUrl) return null;
    const cached = cache.get(photoUrl);
    if (cached && cached.expiresAt > Date.now()) return cached.url;
    return null;
  });

  useEffect(() => {
    if (!photoUrl) {
      setSignedUrl(null);
      return;
    }

    // Check cache
    const cached = cache.get(photoUrl);
    if (cached && cached.expiresAt > Date.now()) {
      setSignedUrl(cached.url);
      return;
    }

    const path = extractStoragePath(photoUrl);
    if (!path) {
      // Not a storage URL — use as-is (e.g. external URL)
      setSignedUrl(photoUrl);
      return;
    }

    let cancelled = false;

    supabase.storage
      .from("profile-photos")
      .createSignedUrl(path, SIGNED_URL_EXPIRY)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error || !data?.signedUrl) {
          setSignedUrl(null);
          return;
        }
        cache.set(photoUrl, {
          url: data.signedUrl,
          expiresAt: Date.now() + (SIGNED_URL_EXPIRY - 60) * 1000, // refresh 1 min early
        });
        setSignedUrl(data.signedUrl);
      });

    return () => {
      cancelled = true;
    };
  }, [photoUrl]);

  return signedUrl;
}

/**
 * Batch-fetch signed URLs for multiple photo URLs at once.
 * Returns a Map from original URL → signed URL.
 */
export function useSignedUrls(photoUrls: (string | null | undefined)[]): Map<string, string> {
  const [urlMap, setUrlMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    const validUrls = photoUrls.filter((u): u is string => !!u);
    if (validUrls.length === 0) {
      setUrlMap(new Map());
      return;
    }

    let cancelled = false;

    const result = new Map<string, string>();
    const toFetch: { original: string; path: string }[] = [];

    for (const url of validUrls) {
      const cached = cache.get(url);
      if (cached && cached.expiresAt > Date.now()) {
        result.set(url, cached.url);
        continue;
      }
      const path = extractStoragePath(url);
      if (!path) {
        result.set(url, url); // external URL
      } else {
        toFetch.push({ original: url, path });
      }
    }

    if (toFetch.length === 0) {
      setUrlMap(result);
      return;
    }

    // Fetch all at once using createSignedUrls
    supabase.storage
      .from("profile-photos")
      .createSignedUrls(
        toFetch.map((f) => f.path),
        SIGNED_URL_EXPIRY
      )
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data) {
          data.forEach((item, i) => {
            if (item.signedUrl) {
              const original = toFetch[i].original;
              cache.set(original, {
                url: item.signedUrl,
                expiresAt: Date.now() + (SIGNED_URL_EXPIRY - 60) * 1000,
              });
              result.set(original, item.signedUrl);
            }
          });
        }
        setUrlMap(new Map(result));
      });

    return () => {
      cancelled = true;
    };
  }, [JSON.stringify(photoUrls)]);

  return urlMap;
}
