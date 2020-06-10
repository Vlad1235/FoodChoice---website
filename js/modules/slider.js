function slider({
	container, slide, nextArrow, prevArrow, totalCount, currentCount, wrapper, field
}) {
    
    // Slider logic
	
	const slides = document.querySelectorAll(slide),
	slider = document.querySelector(container),
	previous = document.querySelector(prevArrow),
	next = document.querySelector(nextArrow),
	total = document.querySelector(totalCount),
	current = document.querySelector(currentCount),
	slidesWrapper = document.querySelector(wrapper),
	slidesField = document.querySelector(field),
	width = window.getComputedStyle(slidesWrapper).width;
	let slideIndex = 1;
	let offset = 0;
	
	slidesField.style.width = 100 * slides.length +"%";
	slidesField.style.display = "flex";
	slidesField.style.transition = "0.5s all";
	slidesWrapper.style.overflow = "hidden";
	
	slides.forEach(slide => {
		slide.style.width = width;
	});
	
	next.addEventListener("click", ()=>{
		if(offset == +width.replace(/\D/g, "") * (slides.length -1)) { 
			offset = 0;
		} else {
			offset += +width.replace(/\D/g, "");
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		
		if(slideIndex == slides.length) {
			slideIndex =1;
		} else {
			slideIndex++;
		}
		
		if(slideIndex < 10){
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
		
		dots.forEach(dot => dot.style.opacity = "0.5");
		dots[slideIndex-1].style.opacity = 1;
	});
	
	previous.addEventListener("click", ()=> {
		if(offset === 0) {              
			offset = +width.replace(/\D/g, "") * (slides.length -1);      
		} else {
			offset -= +width.replace(/\D/g, ""); 
		}
		slidesField.style.transform = `translateX(-${offset}px)`;
		
		if(slideIndex == 1) {
			slideIndex = slides.length;
		} else {
			slideIndex--;
		}
		
		if(slideIndex < 10){
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
		
		dots.forEach(dot => dot.style.opacity = "0.5");
		dots[slideIndex-1].style.opacity = 1;
	});
	
	function addZero() {
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
			current.textContent = `0${slideIndex}`;
		} else {
			total.textContent = slides.length;
			current.textContent = slideIndex;
		}
	}
	addZero();
	
	
	// adding dots (rectangular format) at the bottom of window with sliders
	
	
	slider.style.position = "relative";
	
	const indicators = document.createElement("ol"),
	dots = [];
	
	indicators.classList.add("carousel-indicators");
	slider.append(indicators);
	
	for(let i =0; i < slides.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i+1);
		dot.classList.add("dot");
		if(i === 0) {
			dot.style.opacity = 1;          
		}
		indicators.append(dot);
		dots.push(dot);
	}
	
	dots.forEach(dot => {
		dot.addEventListener("click", (event) => {
			const slideTo = event.target.getAttribute("data-slide-to");
			
			slideIndex = slideTo;
			offset = +width.replace(/\D/g, "") * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;
			
			if(slideIndex < 10){
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}
			
			dots.forEach(dot => dot.style.opacity = "0.5");
			dots[slideIndex-1].style.opacity = 1;
		});
	});
}
export default slider;