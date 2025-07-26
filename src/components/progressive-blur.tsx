const LINEAR_GRADIENTS: string[] = [
  "linear-gradient(to top,rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 40%)",
  "linear-gradient(to top,rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 50%)",
  "linear-gradient(to top,rgba(0, 0, 0, 0) 15%, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 60%)",
  "linear-gradient(to top,rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 70%)",
  "linear-gradient(to top,rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0) 90%)",
  "linear-gradient(to top,rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 1) 80%)",
  "linear-gradient(to top,rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 1) 100%)",
];

export function ProgressiveBlur() {
  return (
    <div
      className="w-full fixed left-0 top-0 z-40"
      style={{
        height: "calc(env(safe-area-inset-top) + 68px)",
      }}
    >
      {LINEAR_GRADIENTS.map((gradient, index) => {
        const blurValue = Math.pow(2, index);
        return (
          <div
            key={index}
            className="absolute top-0 left-0 right-0 bottom-0"
            style={{
              zIndex: index,
              backdropFilter: `blur(${blurValue}px)`,
              WebkitBackdropFilter: `blur(${blurValue}px)`,
              mask: gradient,
            }}
          ></div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-background"></div>
    </div>
  );
}
