const imgUrls: { [key: string]: string } = import.meta.glob(
    ["/images/avatars/*.webp", "/images/avatars/*.png"],
    {
      query: "?url",
      import: "default",
      eager: true,
    }
  );
export default imgUrls;