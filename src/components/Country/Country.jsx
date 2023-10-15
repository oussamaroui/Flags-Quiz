import './Country.css'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';


const Country = () => {

    const randomCountry = Math.floor(Math.random() * 249 + 1);
    const randomOther1 = Math.floor(Math.random() * 249 + 1);
    const randomOther2 = Math.floor(Math.random() * 249 + 1);

    const [previousIndexs, setPreviousIndexs] = useState([]);
    previousIndexs.push(randomCountry);

    console.log(previousIndexs);
    // const x = previousIndexs[previousIndexs.length - 1];
    // const y = [];
    // y.push(previousIndexs[previousIndexs.length - 1])
    // console.log(y);

    // function generateRandomNumberExcludingArray(arr, min, max) {
    //     let randomNum;
    //     do {
    //       randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    //     } while (arr.includes(randomNum));
    //     return randomNum;
    // }

    // const randomNum = generateRandomNumberExcludingArray(existingNumbers, minRange, maxRange);
    // console.log(randomNum);


    const [country, setCountry] = useState({
        flag : null, name: null, other1 : null, other2 : null, capital : null
    });

    const [count, setCount] = useState(1);
    const [correction, setCorrection] = useState('');
    const [correctAnswer, setcorrectAnswer] = useState(0);
    const [wrongAnswer, setwrongAnser] = useState(0);

    const nextBtn = useRef();
    const btns = useRef();
    const cap = useRef();

    const getRandomCountry = function() {
        axios.get('https://restcountries.com/v3.1/all').then((response)=>{
            setCountry(prevState=>({
                ...prevState,
                flag : response.data[randomCountry].flags.svg,
                name : response.data[randomCountry].name.common,
                other1 : response.data[randomOther1].name.common,
                other2 : response.data[randomOther2].name.common,
                capital : response.data[randomCountry].capital,
            }));
            cap.current.style.display = 'none' ;
        });
    };

    const countryNames = [country.name, country.other1, country.other2];
    const ButtonNames = countryNames.sort(() => Math.random() - 0.5);

    useEffect(getRandomCountry, []);

    function answer(selectedAnswer) {
        if (selectedAnswer == country.name) {
            setCount(count+1);
            setcorrectAnswer(correctAnswer+1)
            getRandomCountry()
        }else{
            nextBtn.current.style.display = 'block';
            setwrongAnser(wrongAnswer+1)
            btns.current.style.display = 'none' ;
            setCorrection('It is: ' + country.name)
        }
    }

    const Next = () => {
        nextBtn.current.style.display = 'none';
        cap.current.style.display = 'none';
        setCorrection('');
        getRandomCountry();
        setCount(count+1);
        btns.current.style.display = 'block' ;
    }

    const Help = () => {
        cap.current.style.display = cap.current.style.display === 'block' ? 'none' : 'block';
    }

    return (
        <section className='container'>
            <div className="sm">
                <a href="https://github.com/oussamaroui" target={'_blank'}><img width="25" height="25" src="https://img.icons8.com/ios-filled/500/github.png" alt="github"/></a>
                <a href="https://www.linkedin.com/in/oussama-roui" target={'_blank'}><img width="25" height="25" src="https://img.icons8.com/ios-filled/500/linkedin.png" alt="linkedin"/></a>
                <a href="https://twitter.com/oussama_roui" target={'_blank'}><img width="25" height="25" src="https://img.icons8.com/ios-filled/500/twitterx--v2.png" alt="twitterx--v2"/></a>
            </div>
            <div className='points'>
                <p><b>{count}</b>/250</p>
                <div>
                    <p>Correct Answers <span>{correctAnswer}</span></p>
                    <p>Wrong Answers <span>{wrongAnswer}</span></p>
                </div>
            </div>
            <div className='flag'>
                <img src={country.flag} alt="Country Flag" />
            </div>
            <div className='buttons' ref={btns}>
                {ButtonNames.map((btnName, index) => 
                    <button key={index} onClick={() => answer(btnName)}>{btnName}</button>
                )}
            </div>
            <h1>{correction}</h1>
            <button ref={nextBtn} className='next' onClick={Next} style={{display:'none'}}>Next &rarr;</button>
            <p onClick={Help} className='help'>Help</p>
            <p ref={cap} style={{display:'none'}}>Its capital: {country.capital}</p>
    
        </section>
    ) 
}

export default Country
