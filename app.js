const canvas = document.getElementById("skeleton-canvas");

if (canvas) {
  const riveInstance = new rive.Rive({
    src: "assets/5593-10993-dagger-death-skull.riv",
    canvas,
    autoplay: true,
    stateMachines: ["State Machine 1"],
    onLoad: () => {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      attachPointerEvents();

      const smNames = riveInstance.stateMachineInstances?.map((sm) => sm.name) || [];
      console.info("Rive state machines:", smNames.join(", ") || "None");
    },
  });

  function resizeCanvas() {
    const { clientWidth, clientHeight } = canvas.parentElement;
    canvas.width = clientWidth * window.devicePixelRatio;
    canvas.height = clientHeight * window.devicePixelRatio;
    canvas.style.width = `${clientWidth}px`;
    canvas.style.height = `${clientHeight}px`;
    riveInstance.resizeDrawingSurfaceToCanvas();
  }

  function attachPointerEvents() {
    const events = [
      ["pointermove", handlePointerMove],
      ["pointerenter", handlePointerMove],
      ["pointerdown", handlePointerDown],
      ["pointerup", handlePointerUp],
      ["pointerleave", handlePointerLeave],
    ];

    events.forEach(([eventName, handler]) => {
      canvas.addEventListener(eventName, handler);
    });
  }

  function getCoords(event) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  }

  function handlePointerMove(event) {
    const { x, y } = getCoords(event);
    riveInstance.pointerMove(x, y);
  }

  function handlePointerDown(event) {
    const { x, y } = getCoords(event);
    riveInstance.pointerDown(x, y);
  }

  function handlePointerUp(event) {
    const { x, y } = getCoords(event);
    riveInstance.pointerUp(x, y);
  }

  function handlePointerLeave() {
    riveInstance.pointerMove(-1, -1);
    riveInstance.pointerUp(-1, -1);
  }
}

