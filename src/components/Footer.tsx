export const Footer = () => {
  return (
    <footer className="h-8 flex justify-center">
      <a
        href="https://github.com/DarkNoriss"
        target="_blank"
        className="flex flex-row items-center gap-1 cursor-pointer hover:brightness-75"
      >
        <img src="/assets/github.svg" alt="github_icon" className="h-6 aspect-auto" />
        <h3>DarkNoriss</h3>
      </a>
    </footer>
  );
};
