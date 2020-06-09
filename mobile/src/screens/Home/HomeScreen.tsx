import React from 'react'
import { View, Image, ImageBackground, Text } from 'react-native'
import { logo, homeBackground } from 'src/assets'
import { styles } from './HomeStyle'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import * as Icon from 'react-feather'

const HomeScreen: React.FC = () => {

    const navigation = useNavigation()

    const handleNavigateToPoints = () => {
        navigation.navigate('Points')
    }

    return (
        <ImageBackground
        style={styles.container}
        source={homeBackground}
        imageStyle={{ width: 274, height: 368 }}
        >
        <View style={styles.container}>
            <View style={styles.main}>
                <Image source={logo} />

                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>
                Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
                </Text>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Icon.ArrowRight color="#fff" size={24} />
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </View>
        </ImageBackground>
    )
}

export default HomeScreen