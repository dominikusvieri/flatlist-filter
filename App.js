import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

const listTab = [
  {
    userId: 'All'
  },
  {
    userId: 8,
  },
  {
    userId: 9,
  },
  {
    userId: 10
  }
]

export default function App() {
  const [filterData, setFilterData] = useState([])
  const [dataList, setDataList] = useState(filterData)
  const [userId, setUseId] = useState('All')

  const setUserIdFilter = userId => {
    if (userId !== 'All') {
      setDataList([...filterData.filter(e => e.userId === userId)])
    } else {
      setDataList(filterData)
    }
    setUseId(userId)
  }

  useEffect(() => {
    fetchPosts()

  })

  console.log(fetch('https://jsonplaceholder.typicode.com/posts'))

  const fetchPosts = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilterData(responseJson)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const itemView = ({ item }) => {
    return (
      <View>
        {console.log(item.id)}
        <Text style={styles.itemStyle}>
          {item.id}{'. '}{item.title.toUpperCase()}s

        </Text>
      </View>
    )
  }

  const itemSeparatorView = () => {
    return (
      <View style={{ height: 0.5, width: '100%', backgroundColor: '#b1b1b1' }}></View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: '20px', marginTop: '10px', flexDirection: 'row' }} >
        {listTab.map(data => (
          <TouchableOpacity style={[styles.btnTab]} onPress={() => setUserIdFilter(data.userId)}>
            <ScrollView>
              <Text style={[styles.textTab, userId === data.userId && styles.textTabActive]}>{data.userId}</Text>
            </ScrollView>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={dataList}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={itemSeparatorView}
        renderItem={itemView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemStyle: {
    padding: 10,
  },
  btnTab: {
    flexDirection: 'row', justifyContent: 'center'
  },
  btnTabActive: {
    backgroundColor: '#000'
  },
  textTab: {
    borderWidth: 0.5, borderColor: '#000', padding: '5px', borderRadius: '10px', marginHorizontal: '5px'
  },
  textTabActive: {
    backgroundColor: '#000',
    color: '#fff'
  }

});
