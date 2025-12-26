import { useState, useCallback, useRef } from "react";
import { Slide } from "./types";
import { slideApi } from "./api/mockSlideApi";
import { preloadImage } from "@/shared/lib/preloadImage/preloadImage";

export const useSlides = () => {
  const slidesRef = useRef<Slide[]>([]);
  const pageRef = useRef(2);
  const hasMoreRef = useRef(true);
  const loadingRef = useRef(false);

  
  
  const loadMore = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;

    try {
      //мы получаем page слайдов!
      const newSlides = await slideApi.fetchSlides(pageRef.current);
      //Затем проверяем есть ли еще доступные!
      const moreAvailable = await slideApi.hasMore(pageRef.current);
      //добавляем слайды
      slidesRef.current = [...slidesRef.current, ...newSlides];
      // + 1, чтобы при след loadMore. загрузить некст page слайдов
      pageRef.current = pageRef.current + 1;
      //флаг, можно ли еще грузить
      hasMoreRef.current = moreAvailable;
      //если все загружено - по новой
      if (!hasMoreRef.current) {
        pageRef.current = 1;
        hasMoreRef.current = true;
      }
    } catch (error) {
      console.error('Error loading slides:', error);
    } finally {
      loadingRef.current = false;
    }
  }, [pageRef, loadingRef, hasMoreRef]);

  const loadFirstSlides = useCallback(async () => {
    if (loadingRef.current || !hasMoreRef.current) return;

    loadingRef.current = true;
    try{ 
        slidesRef.current = [];
        pageRef.current = 1;
        const newSlides = await slideApi.fetchSlides(pageRef.current);
        slidesRef.current = [...slidesRef.current, ...newSlides];
    } catch (error) {
      console.error('Error loading slides:', error);
    } finally {
      loadingRef.current = false;
    }

  }, [pageRef, ])

  return {
    loadFirstSlides,
    slidesRef,
    loadMore,
  };
}