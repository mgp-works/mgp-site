const motionAnimations = [
  { id: "motion-pim-hello", path: "/assets/motion/pim-hello.json" },
  { id: "motion-pim-newsbadge", path: "/assets/motion/pim-newsbadge.json" },
  { id: "motion-prelude-splash", path: "/assets/motion/prelude-splash.json" },
  { id: "motion-prelude-loading", path: "/assets/motion/prelude-loading.json" },
];

motionAnimations.forEach(({ id, path }) => {
  const container = document.getElementById(id);
  if (!container) return;

  lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path,
  });
});
