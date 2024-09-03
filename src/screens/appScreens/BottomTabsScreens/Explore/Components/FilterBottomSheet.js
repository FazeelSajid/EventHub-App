import React, {useMemo, useState, useCallback} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {AppStyles} from '../../../../../utils/Styles';
import {filterCategories} from '../../../../../utils/Data';
import CustomButton from '../../../../../components/customButton';
import BlueCalendar from '../../../../../assets/svgs/BlueCalendar.svg';
import Filtermap from '../../../../../assets/svgs/FilterMap.svg';
import ChevronRight from '../../../../../assets/svgs/blueChevronRight.svg';
import Thumb from '../../../../../assets/svgs/Thumb.svg';
import {COLORS} from '../../../../../constants/colors/COLORS';
import {fonts} from '../../../../../assets/fonts/fonts';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomDoubleIconButton from '../../../../../components/CustomDoubleIconButton';
import DatePicker from 'react-native-date-picker'
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';



const FilterCategoryItem = React.memo(({item, index, isSelected, onSelect}) => (
  <View style={{alignItems: 'center', marginRight: wp(5)}}>
    <CustomButton
      containerStyle={[
        AppStyles.filterBottomSheetCategoryButton,
        {backgroundColor: isSelected ? COLORS.primary : '#E0E0E0'},
      ]}
      onPress={() => onSelect(index)}
      svg={item.icon}
    />
    <Text style={AppStyles.filterBottomSheetCategoryText}>{item.title}</Text>
  </View>
));

const PriceRangeSlider = ({priceRange, onValuesChange}) => (
  <View style={AppStyles.filterBottomSheetFilterSection}>
    <View style={[AppStyles.filterBottomSheetPriceRangeContainer, {marginTop: hp('4%')}]}>
      <Text style={[AppStyles.filterBottomSheetFilterLabel, {marginTop: hp('0%'),}]}>
        Select price range
      </Text>
      <Text
        style={
          styles.priceRange
        }>{`$ ${priceRange[0]} - $ ${priceRange[1]}`}</Text>
    </View>
    <MultiSlider
      values={priceRange}
      onValuesChange={onValuesChange}
      min={20}
      max={500}
      step={1}
      selectedStyle={{backgroundColor: COLORS.primary}}
      unselectedStyle={{backgroundColor: COLORS.lightGrayColor}}
      trackStyle={{height: wp(1)}}
      sliderLength={350}
      customMarker={() => (
        <View style={styles.customMarker}>
          <Thumb width={wp(8)} height={wp(8)} />
        </View>
      )}
    />
  </View>
);

const FilterSection = ({label, children}) => (
  <View style={AppStyles.filterBottomSheetFilterSection}>
    <Text style={AppStyles.filterBottomSheetFilterLabel}>{label}</Text>
    {children}
  </View>
);

const FilterBottomSheet = ({bottomSheetRef, handleApplyFilter}) => {
  const [filters, setFilters] = useState({
    selectedCategories: [],
    priceRange: [20, 100],
    selectedDate: new Date(),
    location: 'New York, USA',
    selectedTime: '', // 'Today', 'Tomorrow', 'This week', or ''
  });

  const [openPicker, setOpenPicker] = useState(false)

  const navigation = useNavigation();

  const handleCategorySelect = useCallback(index => {
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedCategories: prevFilters.selectedCategories.includes(index)
        ? prevFilters.selectedCategories.filter(i => i !== index)
        : [...prevFilters.selectedCategories, index],
    }));
  }, []);

  const handlePriceRangeChange = useCallback(values => {
    setFilters(prevFilters => ({
      ...prevFilters,
      priceRange: values,
    }));
  }, []);

  const handleTimeSelect = useCallback(time => {
    setFilters(prevFilters => ({
      ...prevFilters,
      selectedTime: time,
    //   selectedTime: prevFilters.selectedTime.includes(time)
    //     ? prevFilters.selectedTime.filter(i => i !== time) // Deselect if already selected
    //     : [...prevFilters.selectedTime, time], // Select if not selected
    }));
  }, []);

  const snapPoints = useMemo(() => [hp('30%'), hp('78%')], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7} // Adjust backdrop opacity
        appearsOnIndex={0} // Index at which the backdrop appears
        disappearsOnIndex={-1} // Index at which the backdrop disappears
      />
    ),
    []
  );
  return (
    <BottomSheetModalProvider  >
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={styles.bottomSheetBackground}
        backdropComponent={renderBackdrop} // Attach the backdrop

      >


    <View style={AppStyles.filterBottomSheetContentContainer}>
      <Text style={AppStyles.filterBottomSheetHeader}>Filter</Text>

      {/* <FilterSection label="Categories"> */}
        <FlatList
          data={filterCategories}
          renderItem={({item, index}) => (
            <FilterCategoryItem
              key={index}
              item={item}
              index={index}
              isSelected={filters.selectedCategories.includes(index)}
              onSelect={handleCategorySelect}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      {/* </FilterSection> */}

      <FilterSection label="Time & Date">
      <View style={AppStyles.filterBottomSheetTimeButtonsContainer}>
  {['Today', 'Tomorrow', 'This week'].map(time => (
    <CustomButton
      key={time}
      text={time}
      textStyle={[
        AppStyles.filterBottomSheetTimeButtonText,
        {
          color: filters.selectedTime === time ? COLORS.white : COLORS.darkGray, // Change text color based on selection
        },
      ]}
      containerStyle={[
        AppStyles.filterBottomSheetTimeButton,
        {
          backgroundColor:
            filters.selectedTime === time ? COLORS.primary : null, // Change background color based on selection
        },
      ]}
      onPress={() => handleTimeSelect(time)}
    />
  ))}
</View>


        <CustomDoubleIconButton
          containerStyle={AppStyles.filterBottomSheetCalendarButton}
          textStyle={AppStyles.filterBottomSheetTimeButtonText}
          leftSvg={<BlueCalendar width={wp(5)} />}
          rightSvg={<ChevronRight width={wp(5)} />}
          text="Choose from calendar"
          onPress={()=> navigation.navigate('Calender')}
        />
      </FilterSection>

      <FilterSection label="Location">
        <CustomDoubleIconButton
          containerStyle={AppStyles.filterBottomSheetLocationInput}
          textStyle={{
            fontSize: wp(4),
            color: COLORS.blackTxtColor,
            fontFamily: fonts.regular,
            marginLeft: wp(-35),
          }}
          leftSvg={<Filtermap width={wp(12)} height={hp(6)} />}
          rightSvg={<ChevronRight width={wp(4)} />}
          text={filters.location}
          onPress={()=> navigation.navigate('Map')}
        />
      </FilterSection>

      <PriceRangeSlider
        priceRange={filters.priceRange}
        onValuesChange={handlePriceRangeChange}
      />

      <View style={AppStyles.filterBottomSheetButtonContainer}>
        <CustomButton
          containerStyle={AppStyles.filterBottomSheetResetButton}
          text="Reset"
          textStyle={AppStyles.filterBottomSheetResetButtonText}
          onPress={() => 
          //   setFilters({
          //   selectedCategories: [],
          //   priceRange: [20, 25],
          //   selectedDate: new Date(),
          //   location: 'New York, USA',
          //   selectedTime: '',
          // })

          handleApplyFilter()
        }
        />
        <CustomButton
          containerStyle={AppStyles.filterBottomSheetApplyButton}
          text="Apply"
          textStyle={AppStyles.filterBottomSheetApplyButtonText}
          onPress={handleApplyFilter}
        />
      </View>

      {/* <DatePicker
        modal
        open={openPicker}
        date={filters.selectedDate}
        onConfirm={(date) => {
          setOpenPicker(false)
          // setDate(date)
          }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}
    </View>
  </BottomSheetModal>
          </BottomSheetModalProvider>
  );
};

export default FilterBottomSheet;

const styles = StyleSheet.create({
  priceRange: {
    color: COLORS.primary,
    fontFamily: fonts.medium,
    marginBottom: hp('1%'),
    fontSize: wp(4.5),
  },
  bottomSheetBackground: {
    borderRadius: wp(10),
    backgroundColor: COLORS.white,
  },
});
