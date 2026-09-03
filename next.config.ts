import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every image on this site (menu items, events, homepage sections) is a
    // URL the admin pastes in by hand — from the built-in Media uploader, a
    // Supabase storage link, or any other photo host. Next.js's Image
    // Optimizer requires every remote hostname to be allow-listed up front,
    // which isn't practical for admin-picked URLs from anywhere on the web.
    // Turning optimization off trades automatic resizing/format conversion
    // for "any image URL just works," which matters more here.
    unoptimized: true,
  },
};

export default nextConfig;
