{ pkgs }: {
    deps = [
      pkgs.libev
      pkgs.pandoc
      pkgs.glibcLocales
      pkgs.gitFull
      pkgs.gnuplot
      pkgs.ncurses.dev
      pkgs.gd
    ];
  env = {
    PYTHON_LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libev
      pkgs.glibcLocales
      pkgs.gitFull
    ];
  };
}