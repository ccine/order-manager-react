function HighContrastModeButton(props: {
    id: string,
    highContrastMode: boolean;
    setHighContrastMode: (arg0: boolean) => void;
  }) {
  const head = document.head; // Returns the <head> element of the current document

  /**
   * Function that changes all the colors of the page by cheching the state of highContrastMode and then changes its value
   * highContrastMode: false --> highContrastMode ON, !highContrastMode
   * highContrastMode: true --> highContrastMode OFF, !highContrastMode
   */
  function changeContrast() {
    let css = "";
    if (!props.highContrastMode) {
      css = `html {filter: invert(100%);}`;
    } else {
      css = `html {filter: invert(0%);}`;
    }

    const style = document.createElement("style");
    style.type = "text/css";
    if (style.sheet) {
      style.sheet.insertRule(css, 0);
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    props.setHighContrastMode(!props.highContrastMode);
  }

  return (
    <button id={props.id} className="styleSwitcher" onClick={changeContrast} tabIndex={0}>
      <strong>
        High Contrast Mode: {props.highContrastMode ? "ON" : "OFF"}
      </strong>
    </button>
  );
}

export default HighContrastModeButton;
