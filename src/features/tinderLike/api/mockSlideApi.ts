import { Slides } from "../slides";

import { Slide } from "../types";

class MockSlideApi {
  private slides = Slides;
  //число слайдов в Моке - 28. кратно 7 или 4
  //pageSize будет отрабатывать либо 7, либо 4
  private pageSize = 7;

  async fetchSlides(page: number): Promise<Slide[]> {
    //имитация задержки сети
    //await new Promise(resolve => setTimeout(resolve, 300));
    //работает так, потому что моя БД кратна 7. сначала 0, потом 7, потом 14
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.slides.slice(start, end).map((slide, index) =>{
      return {
        id: slide.id,
        style: slide.style,
        title: slide.title,
        description: slide.description,
        img: slide.img, // Локальная картинка сейчас
      }
    });



  }
  
  async hasMore(page: number): Promise<boolean>{
    const totalLoaded = page * this.pageSize;
    return totalLoaded < this.slides.length;
  }
}

export const slideApi = new MockSlideApi();