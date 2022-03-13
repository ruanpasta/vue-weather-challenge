import classModifier from "@/directives/classModifier";

const injectDirectives = (app) => {
  app.directive("class-modifier", classModifier);
};

export default injectDirectives;
