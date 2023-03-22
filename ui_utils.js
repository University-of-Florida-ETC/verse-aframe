function createButton(id, position, text, visible = true, onClick) {
	const button = document.createElement('a-text');
	button.setAttribute('id', id);
	button.setAttribute('value', text);
	button.setAttribute('position', position);
	button.setAttribute('align', 'center');
	button.setAttribute('wrap-count', '130');
	button.setAttribute('visible', visible);
	button.setAttribute('data-clickable', visible);

	if (typeof onClick === 'function') {
		button.addEventListener('click', onClick);
	} else if (typeof onClick === 'string') {
		button.setAttribute('onclick', onClick);
	}

	const plane = document.createElement('a-plane');
	plane.setAttribute('id', `${id}Plane`);
	plane.setAttribute('color', '#426E49');
	plane.setAttribute('scale', '0.8 0.5 1');
	plane.setAttribute('animation', 'property: material.color; to: #1D615C; dur: 500; startEvents: mouseenter;');
	plane.setAttribute('animation__leave', 'property: material.color; to: #426E49; dur: 500; startEvents:mouseleave;');
	button.appendChild(plane);

	return button;
}

// Example usage
const scene = document.querySelector('a-scene');

const button1 = createButton('option1', '-0.8 0.8 -3', 'Option 1: Lorem ipsum dolor', false, 'handleChoice(this.id)');
scene.appendChild(button1);

const button2 = createButton('option2', '0.8 0.8 -3', 'Option 2: Lorem ipsum dolor', false, 'handleChoice(this.id)');
scene.appendChild(button2);
