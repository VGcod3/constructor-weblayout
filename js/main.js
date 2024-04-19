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

const createHeader = ({ title, header: { logo, menu, social } }) => {
	const header = getElement('header');

	const container = getElement('div', ['container'])
	const wrapper = getElement('div', ['header'])

	if (logo) {
		const logoElem = getElement('img', ['logo'], {
			src: logo,
			alt: 'Logo ' + title
		})
		wrapper.append(logoElem)

	}

	if (menu) {
		const nav = getElement('nav', ['menu-list']);
		const allMenuLink = menu.map(item => {
			const link = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title
			});
			return link;

		})
		nav.append(...allMenuLink);
		wrapper.append(nav)

		const menuBtn = getElement('button', ['menu-button']);
		menuBtn.addEventListener('click', () => {
			menuBtn.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		})

		container.append(menuBtn)
	}

	if (social) {
		const socialWrapper = getElement('div', ['social'])
		const allSocial = social.map(item => {
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

const createMain = ({ title, main: { genre, rating, description, trailer, slider } }) => {

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

	if (slider) {
		const sliderBlock = getElement('div', ['series']);
		const swiperBlock = getElement('div', ['swiper-container']);
		const swiperWrapper = getElement('div', ['swiper-wrapper']);
		const arrow = getElement('button', ['arrow']);

		const slides = slider.map(item => {

			const swiperSlide = getElement('div', ['swiper-slide']);
			const card = getElement('figure', ['card']);
			const cardImage = getElement('img', ['card-img'], {
				src: item.img,
				alt: (item.title ? item.title + ' ' : '') + (item.subtitle ? item.subtitle + ' ' : '')
			});

			card.append(cardImage);

			if (item.title || item.subtitle) {
				const cargDescription = getElement('figcaption', ['card-description']);
				cargDescription.innerHTML = `
         ${item.subtitle ? ` <p class="card-subtitle">${item.subtitle}</p>` : ''}
         ${item.title ? ` <p class="card-title">${item.title}</p>` : ''} `;

				card.append(cargDescription);
			};

			swiperSlide.append(card);
			console.log(swiperSlide);
			return swiperSlide;
		});

		swiperWrapper.append(...slides);
		swiperBlock.append(swiperWrapper);
		sliderBlock.append(swiperBlock, arrow);

		container.append(sliderBlock);

		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
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
	};
	return main;
}

const movieConstructor = (selector, options) => {

	const app = document.querySelector(selector);
	app.classList.add('body-app')

	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);

		const favicon = getElement('link', null, {
			rel: 'icon',
			href: options.favicon,
			type: 'image/' + (type == 'svg' ? 'svg-xml' : type),
		})

		document.head.append(favicon)

	}


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
	favicon: 'witcher/logo.png',
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
				title: 'Description',
				link: '#',
			},
			{
				title: 'Trailer',
				link: '#',
			},
			{
				title: 'Feedback',
				link: '#',
			}
		]
	},
	main: {
		genre: '2019, fantasy',
		rating: "8",
		description: `The Witcher Geralt, mutant and monster-killer, travels the Continent on his trusty horse named Carnivore. For a tight pouch of minted coins, this man will rid you of all manner of insolent evil - even swamp monsters, werewolves, and even enchanted princesses`,
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		slider: [
			{
				img: 'witcher/series/series-1.jpg',
				title: "The end's beginning",
				subtitle: 'Episode №1'
			},
			{
				img: 'witcher/series/series-2.jpg',
				title: 'Four Marks',
				subtitle: 'Episode №2'
			},
			{
				img: 'witcher/series/series-3.jpg',
				title: 'Betrayer Moon',
				subtitle: 'Episode №3'
			},
			{
				img: 'witcher/series/series-4.jpg',
				title: 'Of Banquets, Bastards and Burials',
				subtitle: 'Episode №4'
			}
		]
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
