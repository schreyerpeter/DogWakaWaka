interface BasicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  theme: "blue" | "white" | "grey";
}

const BasicButton: React.FunctionComponent<BasicButtonProps> = ({
  children,
  theme,
  ...rest
}) => {
  // TODO: figure out why sometimes the theme gets totally ignored here after
  // using the app for a few minutes, even though the class is applied ¯\_(ツ)_/¯
  const className = `block rounded-lg bg-${theme}-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-${theme}-700 focus:outline-none focus:ring ${
    theme == "white" ? "border-white border-2" : ""
  } ${theme === "grey" ? "text-gray-400" : ""}}`;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default BasicButton;
