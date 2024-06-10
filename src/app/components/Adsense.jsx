import Script from "next/script";

const AdSense = () => {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9168362458076214`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
};

export default AdSense;
