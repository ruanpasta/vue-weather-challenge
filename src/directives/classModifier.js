const classModifier = {
  mounted: (el, binding) => {
    const { value } = binding;

    if (value) {
      const className = `${el.className}--${binding.value}`;
      el.removeAttribute("class");
      el.setAttribute("class", className);
    }
  },
};

export default classModifier;
