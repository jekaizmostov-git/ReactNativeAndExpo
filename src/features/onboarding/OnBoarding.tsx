import { Card } from "@/shared/ui/Card";
import { 
  Image,
  FlatList, 
  View,
  Dimensions} from "react-native";
import { Button } from "@/shared/ui/Button";

import { baseTheme } from "@/shared/config/theme";


import { RenderText } from "./renderText";
import { makeStyles } from "@/shared/lib/theme/makeStyles";
import { useStyles } from "@/shared/lib/theme/useStyles";

import { SLIDES } from "./SLIDES";
import { useOnboarding } from "./useOnboarding";

const { width } = Dimensions.get('window');


type OnBoardingProps = {
  finishHandler: () => void;
}

export function OnBoarding({finishHandler} : OnBoardingProps){
  const styles = useStyles(s);
  
  const windowWithoutPaddingWidth = width - styles.container.paddingHorizontal * 2;

  const getTextItemLayout = (data: any, index: number) => ({
    length: windowWithoutPaddingWidth - baseTheme.spacing.md*2,
    offset: (windowWithoutPaddingWidth - baseTheme.spacing.md*2) * index,
    index,
  });

  const {
    textFlatListRef,
    imageFlatListRef,
    currentIndex,
    goToNextSlide,
    onTextScroll,
  } = useOnboarding({slides:SLIDES, finishHandler});
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
            style={styles.flatList}
            ref={imageFlatListRef}
            data={SLIDES}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false} // нельзя скроллить
            decelerationRate="fast"
            snapToInterval={windowWithoutPaddingWidth - baseTheme.spacing.md*2}
            snapToAlignment="center"
            getItemLayout={getTextItemLayout}
          renderItem={({item}) => {
            return (
              <View style={{ 
                width: windowWithoutPaddingWidth - baseTheme.spacing.md*2, 
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                }}>
                  <Image 
                    source={item.image} 
                    style={[
                      styles.image, 
                      { 
                        width: '90%',   
                        height: '90%', 
                      }
                  ]}
              />
            </View>
          )
        }}   
        />
      </View>
      <Card>
        <FlatList
          ref={textFlatListRef}
          data={SLIDES}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onTextScroll} // можно скроллить
          scrollEventThrottle={8} // стандартная частота
          decelerationRate="fast"
          snapToInterval={windowWithoutPaddingWidth - baseTheme.spacing.md*2}
          snapToAlignment="center"
          getItemLayout={getTextItemLayout}
          renderItem={({ item }) => (
            <RenderText 
              id={item.id}
              title={item.title}
              description={item.description}
              highlight={item.highlight}
              width={windowWithoutPaddingWidth - baseTheme.spacing.md*2}
            />
          )}
        />
        <View style={styles.dotContainer}>
          {SLIDES.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        currentIndex === index && styles.activeDot,
                      ]}
              />
            ))}
        </View>
        <Button title = {currentIndex !== SLIDES.length - 1?"Продолжить":"Начать"} onPress={goToNextSlide} />
      </Card>
    </View>
  )
}

const s = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: theme.colors.bg,
  },
  flatList: {
    alignSelf: 'center',
    width:  width - theme.spacing.lg * 3,
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 16,
  },
  image: {
    resizeMode: 'contain',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: theme.colors.primary,
  }
}))