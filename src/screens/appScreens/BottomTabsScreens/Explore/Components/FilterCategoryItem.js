import { Text, View } from "react-native";
import { AppStyles } from "../../../../../utils/Styles";
import CustomButton from "../../../../../components/customButton";
import React from "react";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const FilterCategoryItem = React.memo(({item, index, isSelected, onSelect}) => (
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


  export const FilterSection = ({label, children}) => (
    <View style={AppStyles.filterBottomSheetFilterSection}>
      <Text style={AppStyles.filterBottomSheetFilterLabel}>{label}</Text>
      {children}
    </View>
  );