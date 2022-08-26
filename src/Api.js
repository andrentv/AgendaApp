import AsyncStorage from '@react-native-async-storage/async-storage';
import { add } from 'react-native-reanimated';
import { API_URL } from '@env';

const BASE_API = process.env.API_URL;

export default {
 //auth/refresh
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });
        const json = await req.json();
        return json;
    },
    //auth/refresh
    signIn: async (email, password) => {
    		//console.log("URL", `${BASE_API}/login`);
    		//console.log("BODY", JSON.stringify({ email, password }));
    		//console.log("password", password);
        const req = await fetch(`${BASE_API}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => {
    		//console.log("URL", `${BASE_API}/user`);
    		console.log("BODY", JSON.stringify({ email, password, name }));
    		//console.log("password", password);
        const req = await fetch(`${BASE_API}/user`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await req.json();
        return json;       
    },
    //auth/logout
    logout: async () => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/login`, {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        });

        const json = await req.json();
        return json;
    },
    getBarbers: async (lat = null, lng = null, address = null) => {
        const token = await AsyncStorage.getItem('token');

        console.log("LAT", lat);
        console.log("LNG", lng);
        console.log("ADDRESS", address);

        const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
    },
    getBarber: async (id) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/barber/${id}?token=${token}`);
        const json = await req.json();
        return json;

    },
    setFavorite: async (barberId) => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/user/favorite`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, barber: barberId })
        });
        const json = await req.json();
        return json;
    },
    setAppointment: async (user, service, selectedYear, selectedMonth, selectedDay, selectedHour) => {

        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/user/appointment`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token,
                id: user.id,
                service,
                year: selectedYear,
                month: selectedMonth,
                day: selectedDay,
                hour: selectedHour
            })
        });
        const json = await req.json();
        return json;
    }
}
