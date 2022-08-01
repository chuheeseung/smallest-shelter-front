import React, { Children, useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { slideData } from './SlideDataDummy';

const Container = styled.div`
  overflow: hidden;
  height: 298px;
`;

Container.displayName = 'Container';

const Slide = styled.div`
  position: relative;
  user-select: none;
  height: 100%;
`;

Slide.displayName = 'Slide';

const itemGutterRatio = ({ perPage, gutter }) =>
  ((perPage - 1) * gutter) / perPage;
const itemWidth = perPage => 100 / perPage;

const transformValue = ({ position, perPage, gutter }) => {
  const positionTimesItemWidth = position * itemWidth(perPage);
  const positionTimesItemGutterRatio =
    position * (-itemGutterRatio({ perPage, gutter }) + gutter);

  return `
    translateX(calc(-${positionTimesItemWidth}% - ${positionTimesItemGutterRatio}px))
  `;
};

const ItemsContainer = styled.div`
  display: flex;
  transition: transform 0.25s ease-in-out;
  transform: ${transformValue};
  height: 100%;

  @media (max-width: 768px) {
    transform: ${props => transformValue({ ...props, perPage: 1 })};
  }
`;

ItemsContainer.displayName = 'ItemsContainer';

const Item = styled.div`
  display: flex;
  flex-basis: ${props =>
    `calc(${itemWidth(props.perPage)}% - ${itemGutterRatio(props)}px)`};
  padding-right: ${({ gutter }) => `${gutter}px`};
  flex-grow: 0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

Item.displayName = 'Item';

const IndicatorsContainer = styled.ul`
  z-index: 1;
  position: absolute;
  bottom: 27.25px;

  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  justify-content: center;

  pointer-events: none;

  > :last-child {
    margin-right: 0px;
  }
`;

const Indicator = styled.li`
  display: block;
  height: 4px;
  width: 4px;
  margin-right: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
  border-radius: 50%;

  background-color: #ffffff;

  transition: transform 0.25s ease-in-out;
  transform-origin: center;
  transform: scale(${({ active }) => (active ? '2.625' : '1')});
`;

const Indicators = ({ position, childrenLength }) => {
  return (
    <IndicatorsContainer>
      {Array.from({ length: childrenLength }, (v, i) => (
        <Indicator active={position === i} key={i} />
      ))}
    </IndicatorsContainer>
  );
};

const ArrowsContainer = styled.div`
  position: absolute;
  z-index: 5;
  right: 0;
  top: calc(50% - 20px);
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  padding: 0 32px;

  pointer-events: none;
`;

ArrowsContainer.displayName = 'ArrowsContainer';

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  user-select: none;

  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

  border-radius: 50%;
  pointer-events: auto;
  cursor: pointer;

  &:after {
    content: '';
    display: block;
    height: 17.52px;
    width: 9.52px;
    background-position: center;
    background-image: url('http://192.168.197.24:3000/end-user/static/images/8a97dcbb5ff7c290d6702a6c6b2af017.svg');
    background-repeat: no-repeat;
  }

  &:first-child {
    &:after {
      transform: rotate(180deg);
    }
  }
`;

Arrow.displayName = 'Arrow';

const Arrows = ({ prevFunction, nextFunction }) => {
  return (
    <ArrowsContainer>
      <Arrow onClick={prevFunction} />
      <Arrow onClick={nextFunction} />
    </ArrowsContainer>
  );
};

Arrows.propTypes = {
  prevFunction: PropTypes.func.isRequired,
  nextFunction: PropTypes.func.isRequired,
};

const useCarousel = ({ p = 0, length, perPage = 3 }) => {
  const [position, setPosition] = useState(p);

  useEffect(() => {
    setPosition(p);
  }, [p]);

  const mql = useMemo(() => window.matchMedia('(max-width: 768px)'), []);

  const [isMobile, setIsMobile] = useState(mql.matches);

  useEffect(() => {
    const fn = e => setIsMobile(e.matches);

    mql.addListener(fn);

    return () => {
      mql.removeEventListener(fn, null);
    };
  }, []);

  const aux = isMobile ? 1 : perPage;

  const next = () => {
    const newPosition = position === length - aux ? 0 : position + 1;

    setPosition(newPosition);
  };

  const prev = () => {
    const newPosition = position === 0 ? length - aux : position - 1;

    setPosition(newPosition);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => next(),
    onSwipedRight: () => prev(),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  return {
    next,
    prev,
    position,
    isMobile,
    handlers,
  };
};

const Carousel = ({ children, perPage, position: propsPosition, gutter }) => {
  const childrenLength = useMemo(() => children.length || 1, [children.length]);

  const { next, prev, position, isMobile, handlers } = useCarousel({
    length: childrenLength,
    perPage,
    p: propsPosition,
  });

  return (
    <Container>
      <Slide>
        {isMobile ? (
          <Indicators position={position} childrenLength={childrenLength} />
        ) : (
          <Arrows prevFunction={prev} nextFunction={next} />
        )}

        <ItemsContainer
          perPage={perPage}
          position={position}
          gutter={gutter}
          {...handlers}
        >
          {Children.map(children, child => (
            <Item perPage={perPage} gutter={gutter}>
              {child}
            </Item>
          ))}
        </ItemsContainer>
      </Slide>
    </Container>
  );
};

const CarouselItem = styled.img`
  display: block;
  object-fit: cover;
  height: 50%;
  width: 100%;
  margin: auto;
  border-radius: 15px;
`;

const SliderSection = ({recommandAnimal}) => (
  <Carousel perPage={3} gutter={12}>
  {
    recommandAnimal.map((item) => {
      return (
        <CarouselItem
          src = {item.recommandImgUrl}
        />

      )
    })
  }
    {/* <CarouselItem
      onClick={() => console.log('clicou')}
      src="https://images.unsplash.com/photo-1565225411862-b2a8c8a25101?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
    /> */}
    {/* <CarouselItem src="https://images.unsplash.com/photo-1565766046621-5548ffdf30af?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
    <CarouselItem src="https://images.unsplash.com/photo-1565609538970-d592a2d36fb6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
    <CarouselItem src="https://images.unsplash.com/photo-1564558519619-ce9701b83193?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
    <CarouselItem src="https://images.unsplash.com/photo-1565128939503-e95077cea904?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
    <CarouselItem src="https://images.unsplash.com/photo-1565063407996-ab476d3cd8d4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
    <CarouselItem src="https://images.unsplash.com/photo-1565063407996-ab476d3cd8d4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" /> */}
  </Carousel>
);

export default SliderSection;
