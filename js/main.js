/* new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
}) */

const getElement = (tagName, classNames, attributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames);
	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute]
		}
	}
	return element;
}

const createHeader = (param) => {
	const header = getElement('header');

	const container = getElement('div', ['container'])
	const wrapper = getElement('div', ['header'])

	if (param.header.logo) {
		const logo = getElement('img', ['logo'], {
			src: param.header.logo,
			alt: 'Logo ' + param.title
		})
		wrapper.append(logo)

	}

	if (param.header.menu) {
		const nav = getElement('nav', ['menu-list']);
		const allMenuLink = param.header.menu.map(item => {
			const link = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title
			});
			return link;

		})
		nav.append(...allMenuLink);
		wrapper.append(nav)
	}

	if (param.header.social) {
		const socialWrapper = getElement('div', ['social'])
		const allSocial = param.header.social.map(item => {
			const socialLink = getElement('a', ['social-link'])
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title
			}))

			socialLink.href = item.link;

			return socialLink
		});
		console.log(allSocial);
		socialWrapper.append(...allSocial)
		wrapper.append(socialWrapper)

	}

	header.append(container);
	container.append(wrapper);

	return header;
}

const createMain = ({ title, main: { genre, rating, description, trailer } }) => {

	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper);
	const content = getElement('div', ['content']);
	wrapper.append(content);


	if (genre) {
		const genreSpan = getElement('span', ['gernre', 'animated', 'fadeInRight'], { textContent: genre })

		content.append(genreSpan)
	}

	if (rating) {

		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number'], {
			textContent: `rating: ${rating}/10`
		});

		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? `` : `Rating ${rating} / 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
			});

			ratingStars.append(star)
		}

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);

	}

	if (title) {
		content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
			textContent: title
		}))
	}

	if (description) {
		content.append(getElement('p', ['main-description', 'animated', 'fadeInRight'], {
			textContent: description
		}))
	}

	if (trailer) {
		const youtubeLink = getElement('a', ["button", "animated", "fadeInRight", 'youtube-modal'], {
			href: trailer,
			textContent: "Watch Trailer"
		})

		const youtubeImageLink = getElement('a', ['play', 'youtube-modal'], {
			href: trailer,
			areaLabel: 'Watch trailer'
		})

		const iconPlay = getElement('img', ["play-img"], {
			src: 'img/play.svg',
			alt: 'watch trailer',
			areaHidden: true
		})

		content.append(youtubeLink)
		wrapper.append(youtubeImageLink)
		youtubeImageLink.append(iconPlay)
	}
	return main;
}

const movieConstructor = (selector, options) => {

	const app = document.querySelector(selector);
	app.classList.add('body-app')

	app.style.backgroundImage = options.background ?
		`url('${options.background}')` : '';

	document.title = options.title;

	if (options.header) {

		app.append(createHeader(options))
	}

	if (options.main) {
		app.append(createMain(options))
	}

}

movieConstructor('.app', {
	title: 'Witcher',
	background: 'witcher/background.jpg',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: 'twitter',
				link: 'https://twitter.com',
				image: 'witcher/social/twitter.svg'
			},
			{
				title: 'instagram',
				link: 'https://instagram.com',
				image: 'witcher/social/instagram.svg'
			},
			{
				title: 'facebook',
				link: 'https://facebook.com',
				image: 'witcher/social/facebook.svg'
			}
		],
		menu: [
			{
				title: 'Описание',
				link: '#',
			},
			{
				title: 'Трейлер',
				link: '#',
			},
			{
				title: 'Фидбек',
				link: '#',
			}
		]
	},
	main: {
		genre: '2019, fantasy',
		rating: "8",
		description: `Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс`,
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
	}
});

/* function wrapper(fn) {
	const cache = [];
	return (...args) => {
		const result = fn(...args)
		cache.push({
			[fn.name + JSON.stringify(args)]: result
		})
		console.log(cache);

		return result

	}
}

const multy = (a, b) => a ** b;

const mulTyWrapper = wrapper(multy);

console.log(multy(5, 3));
console.log(mulTyWrapper(5, 3));
 */