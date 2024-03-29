/* eslint-disable */
export function xml2json(xml, tab) {
  var X = {
    toObj(xml) {
      let o = {};
      if (xml.nodeType == 1) { // element node ..
        if (xml.attributes.length) // element with attributes  ..
        {
          for (let i = 0; i < xml.attributes.length; i++) o[`@${xml.attributes[i].nodeName}`] = (xml.attributes[i].nodeValue || '').toString();
        }
        if (xml.firstChild) { // element has child nodes ..
          let textChild = 0; let cdataChild = 0; let
            hasElementChild = false;
          for (var n = xml.firstChild; n; n = n.nextSibling) {
            if (n.nodeType == 1) hasElementChild = true;
            else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
            else if (n.nodeType == 4) cdataChild++; // cdata section node
          }
          if (hasElementChild) {
            if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
              X.removeWhite(xml);
              for (var n = xml.firstChild; n; n = n.nextSibling) {
                if (n.nodeType == 3) // text node
                { o['#text'] = X.escape(n.nodeValue); } else if (n.nodeType == 4) // cdata node
                { o['#cdata'] = X.escape(n.nodeValue); } else if (o[n.nodeName]) { // multiple occurence of element ..
                  if (o[n.nodeName] instanceof Array) o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                  else o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                } else // first occurence of element..
                { o[n.nodeName] = X.toObj(n); }
              }
            } else { // mixed content
              if (!xml.attributes.length) o = X.escape(X.innerXml(xml));
              else o['#text'] = X.escape(X.innerXml(xml));
            }
          } else if (textChild) { // pure text
            if (!xml.attributes.length) o = X.escape(X.innerXml(xml));
            else o['#text'] = X.escape(X.innerXml(xml));
          } else if (cdataChild) { // cdata
            if (cdataChild > 1) o = X.escape(X.innerXml(xml));
            else for (var n = xml.firstChild; n; n = n.nextSibling) o['#cdata'] = X.escape(n.nodeValue);
          }
        }
        if (!xml.attributes.length && !xml.firstChild) o = null;
      } else if (xml.nodeType == 9) { // document.node
        o = X.toObj(xml.documentElement);
      } else console.log(`unhandled node type: ${xml.nodeType}`);
      return o;
    },
    toJson(o, name, ind) {
      let json = name ? (`"${name}"`) : '';
      if (o instanceof Array) {
        for (let i = 0, n = o.length; i < n; i++) o[i] = X.toJson(o[i], '', `${ind}\t`);
        json += `${(name ? ':[' : '[') + (o.length > 1 ? (`\n${ind}\t${o.join(`,\n${ind}\t`)}\n${ind}`) : o.join(''))}]`;
      } else if (o == null) json += `${name && ':'}null`;
      else if (typeof (o) === 'object') {
        const arr = [];
        for (const m in o) arr[arr.length] = X.toJson(o[m], m, `${ind}\t`);
        json += `${(name ? ':{' : '{') + (arr.length > 1 ? (`\n${ind}\t${arr.join(`,\n${ind}\t`)}\n${ind}`) : arr.join(''))}}`;
      } else if (typeof (o) === 'string') json += `${name && ':'}"${o.toString()}"`;
      else json += (name && ':') + o.toString();
      return json;
    },
    innerXml(node) {
      let s = '';
      if ('innerHTML' in node) s = node.innerHTML;
      else {
        var asXml = function (n) {
          let s = '';
          if (n.nodeType == 1) {
            s += `<${n.nodeName}`;
            for (let i = 0; i < n.attributes.length; i++) s += ` ${n.attributes[i].nodeName}="${(n.attributes[i].nodeValue || '').toString()}"`;
            if (n.firstChild) {
              s += '>';
              for (let c = n.firstChild; c; c = c.nextSibling) s += asXml(c);
              s += `</${n.nodeName}>`;
            } else s += '/>';
          } else if (n.nodeType == 3) s += n.nodeValue;
          else if (n.nodeType == 4) s += `<![CDATA[${n.nodeValue}]]>`;
          return s;
        };
        for (let c = node.firstChild; c; c = c.nextSibling) s += asXml(c);
      }
      return s;
    },
    escape(txt) {
      return txt.replace(/[\\]/g, '\\\\')
        .replace(/[\"]/g, '\\"')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r');
    },
    removeWhite(e) {
      e.normalize();
      for (let n = e.firstChild; n;) {
        if (n.nodeType == 3) { // text node
          if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
            const nxt = n.nextSibling;
            e.removeChild(n);
            n = nxt;
          } else n = n.nextSibling;
        } else if (n.nodeType == 1) { // element node
          X.removeWhite(n);
          n = n.nextSibling;
        } else // any other node
        { n = n.nextSibling; }
      }
      return e;
    },
  };
  if (xml.nodeType == 9) // document node
  { xml = xml.documentElement; }
  const json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, '\t');
  return `{\n${tab}${tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, '')}\n}`;
}
