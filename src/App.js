import { useState } from "./mini-v";

const transform = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  console.log(doc);
  function traverse(node) {
    const obj = {
      type: node.nodeName.toLowerCase(),
      children: [],
    };

    if (node.nodeType === Node.TEXT_NODE) {
      obj.value = node.nodeValue.trim();
      return obj;
    }

    for (const childNode of node.childNodes) {
      obj.children.push(traverse(childNode));
    }

    return obj;
  }

  return traverse(doc.body.firstChild);
};

const getDom = (template, map) => {
  const obj = transform(template);
  console.log(obj);
  const dom = document.createElement(obj.type);

  obj.children.forEach((e) => {
    const childNode = document.createElement(e.type.replace("#", ""));
    if (e.type === "button") {
      childNode.innerHTML = e.children[0].value;
      childNode.addEventListener("click", () => {
        map.get("click1")();
      });
    } else if(e.type === 'p'){
        childNode.innerHTML = e.children[0].value;
    } else {
      childNode.innerHTML = e.value;
    }
    dom.appendChild(childNode);
  });
  return dom;
};

const App = () => {
  const [num, setNum] = useState(0);
  const [str, setStr] = useState('hi');

  const click1 = () => {
    setNum((pre) => pre + 1);
    if (num === 5) {
      setStr("hello");
      return;
    }
    console.log(num);
  };
  // 通过babel转换
  const map = new Map();
  map.set(click1.name, click1);
  const template = `<div>${num} <p>字符串str的值${str}</p> <button onclick-{click1}>num++</button> </div`;
  const dom = getDom(template, map);
  return dom;
};

export default App;
