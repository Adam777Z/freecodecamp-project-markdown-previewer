const projectName = 'markdown-previewer';
localStorage.setItem('example_project', 'Markdown Previewer');

const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = function(href, title, text) {
	const html = linkRenderer.call(renderer, href, title, text);
	return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
};

function parseMarkdown() {
	document.querySelector('#preview').innerHTML = marked(document.querySelector('#editor').value, {
		renderer: renderer,
		gfm: true,
		breaks: true
	});
}

document.addEventListener('DOMContentLoaded', (event) => {
	parseMarkdown();

	['change', 'keypress', 'keyup', 'keydown'].forEach((type) => {
		document.querySelector('#editor').addEventListener(type, (event2) => {
			parseMarkdown();
		});
	});
});