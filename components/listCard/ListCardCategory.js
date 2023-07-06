import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import img1 from '../../assets/care.png'
import img2 from '../../assets/clothes.png'
import img3 from '../../assets/food.png'
import img4 from '../../assets/game.png'
import img5 from '../../assets/home.png'
import img6 from '../../assets/medical.png'
import img7 from '../../assets/other.png'
import img8 from '../../assets/walk.png'
import CardCategory from '../card/CardCategory'


const ListCardCategory = () => {
    const dataCategory = [
        {
            id: 1,
            title: 'care',
            color: '#FF9B9B',
            image: img1
        },
        {
            id: 2,
            title: 'clothes',
            color: '#AAC8A7',
            image: img2
        },
        {
            id: 4,
            title: 'game',
            color: '#F1C27B',
            image: img4
        },
        {
            id: 5,
            title: 'home',
            color: '#C2DEDC',
            image: img5
        },
        {
            id: 3,
            title: 'food',
            color: '#9BABB8',
            image: img3
        },
        {
            id: 6,
            title: 'medical',
            color: '#F2D8D8',
            image: img6
        },
        {
            id: 7,
            title: 'other',
            color: '#ea580a9d',
            image: img7
        },
        {
            id: 8,
            title: 'walk',
            color: '#0094de94',
            image: img8
        },
    ]

    const renderCategoryList = (itemData) => {
        const handlerCategory = () => {

        }
        return (
            <CardCategory color={itemData.item.color}
                image={itemData.item.image}
                title={itemData.item.title}
                onPress={handlerCategory}

            />
        )
    }
    return (
        <View>

            <FlatList
                data={dataCategory}
                keyExtractor={(item) => item.id}
                renderItem={renderCategoryList}
                numColumns={4}
                contentContainerStyle={styles.flatListContent}
                scrollEnabled={false}
            // horizontal={true}
            />

        </View>
    )
}

export default ListCardCategory

const styles = StyleSheet.create({
    flatListContent: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
    },
    categoryItem: {
        width: '75%', // Độ rộng của mỗi phần tử, 25% để có 4 cột
        aspectRatio: 1, // Đảm bảo mỗi phần tử có tỷ lệ 1:1 (hình vuông)
    },
});