import marked from 'marked';
import Highlight from 'highlight.js';
import xss from 'xss';
import moment from'moment';

export function redirectURL(url) {
  location = url;
}

marked.setOptions({
  highlight: function (code) {
    return Highlight.highlightAuto(code).value;
  }
});

const xssOptions = {
  whiteList: Object.assign({}, xss.whiteList),
};
xssOptions.whiteList.code = ['class'];
xssOptions.whiteList.span = ['class'];
const myxss = new xss.FilterXSS(xssOptions);

export function renderMarkdown(text) {
  return myxss.process(marked(text));
}


moment.locale('zh-cn');
export function formatDate (date, friendly) {
  date = moment(date);

  if (friendly) {
    return date.fromNow();
  } else {
    return date.format('YYYY-MM-DD HH:mm');
  }

};
