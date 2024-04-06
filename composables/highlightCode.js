// import hljs from "highlight.js/lib/core";
import hljs from 'highlight.js'; // import all langauges, this may make bundle size big | above example load manually
// Load languages for syntax highlighting
// import javascript from "highlight.js/lib/languages/javascript";
// import python from "highlight.js/lib/languages/python";
// import cpp from "highlight.js/lib/languages/cpp";
// import css from "highlight.js/lib/languages/css";

// hljs.registerLanguage("python", python);
// hljs.registerLanguage("cpp", cpp);
// hljs.registerLanguage("javascript", javascript);
// hljs.registerLanguage("css", css);

export const highlightCode = (content, language) => {
    if (language && hljs.getLanguage(language)) {
      try {
        return hljs.highlight(language, content).value;
      } catch (__) { }
    }
    return content;
  };
  