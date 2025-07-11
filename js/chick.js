const icon = document.querySelector('#chick-icon');
const chick = document.querySelector('#fitness-chick');
const closeBTN = document.querySelector('#close');
const results = document.querySelector('.results');
const calcBTN = document.querySelector('#calculate');

//點小雞開啟彈窗
icon.addEventListener('click', () => {
    chick.classList.add('active')
})

//點X關掉
closeBTN.addEventListener('click', () => {
    chick.classList.remove('active')
    results.innerHTML = ''
    document.querySelector('#fitness-form').reset()
    document.querySelector('.result-line').style.display = 'none';
})


//點外面關掉

chick.addEventListener('click', (e) => {
    const content = document.querySelector('.chick-content')
    if(!content.contains(e.target)){
        chick.classList.remove('active')
        results.innerHTML = ''
        document.querySelector('#fitness-form').reset()
        document.querySelector('.result-line').style.display = 'none';
    }
})



//年齡驗證
document.querySelector('#age').addEventListener('input',function(){
    const val = parseFloat(this.value)
    const error = document.querySelector('#age-error')
    if (!this.value){
        error.textContent = ''
    }else if (isNaN(val) || val < 16 || val > 120){
        error.textContent = '請輸入16-120的數字'
    }else{
        error.textContent = ''
    }
})

//身高驗證
document.querySelector('#height').addEventListener('input',function(){
    const val = parseFloat(this.value)
    const error = document.querySelector('#height-error')
    if (!this.value){
        error.textContent = ''
    }else if (isNaN(val) || val < 130  || val > 250){
        error.textContent = '請輸入130 - 250的數字'
    }else{
        error.textContent = ''
    }
})

//體重驗證
document.querySelector('#weight').addEventListener('input',function(){
    const val = parseFloat(this.value)
    const error = document.querySelector('#weight-error')
    if (!this.value){
        error.textContent = ''
    }else if (isNaN(val) || val < 40  || val > 200){
        error.textContent = '請輸入40 - 200的數字'
    }else{
        error.textContent = ''
    }
})
    calcBTN.addEventListener('click', (e) => {
        e.preventDefault()
        
    let gender = null
    const gender_element =  document.querySelector('input[name="gender"]:checked')
    if(gender_element){
        gender = gender_element.value
    }
    
    // parseFloat 字串轉換成浮點數
    const age = parseFloat(document.querySelector('#age').value);
    const height = parseFloat(document.querySelector('#height').value);
    const weight = parseFloat(document.querySelector('#weight').value);
    const activity = parseFloat(document.querySelector('input[name="activity"]:checked').value);

    if(!gender ||
        isNaN(age) || age < 16 || age > 120 ||
       isNaN(weight) || weight < 40 || weight >200 ||
       isNaN(height) || height < 130 || height >250 
    ){

        results.innerHTML = '<p class="error">請輸入正確的數值!</p>'
        results.scrollIntoView({ behavior: 'smooth' });
        return;
    }






    // BMI --> 體重(公斤) / (身高 / 100) 的平方
    const bmi =  weight / Math.pow(height / 100, 2)


    //男：66＋( 13.7*體重kg＋5*身高cm－6.8*年齡) 
    //女：655＋( 9.6*體重kg＋1.8*身高cm－4.7*年齡)
    let bmr;
    if (gender === 'male'){
        bmr = 66 + (13.7 * weight) + (5 * height) - (6.8 * age)
    }else{
        bmr = 655 +  (9.6 * weight) + (1.8 * height) - (4.7 * age)
    }

    //TDEE的計算=BMRx活動量
    const tdee = bmr * activity;

    //IBW Ideal body weight
    //男性: 標準體重(公斤) = 62 + (身高(公分) - 170) * 0.6
    //女性: 標準體重(公斤) = 52 + (身高(公分) - 160) * 0.5 

    let ibw;
    if(gender === 'male'){
        ibw = 62 + (height - 170) * 0.6
    }else{
        ibw = 52 + (height - 160) * 0.5
    }
    //體脂率
    //男性體脂率: 1.2 x BMI + 0.23 x 年齡- 16.2 
    //女性體脂率: 1.2 x BMI + 0.23 x 年齡- 5.4 
    //以女生反推，男生16.2 - 5.4 ＝ 10.8
    const bodyFat = (1.2 * bmi + 0.23 * age - 10.8 *(gender ==='male'? 1 : 0) -5.4).toFixed(1)
    
    //成年人每日蛋白質攝取量為每公斤體重1.1克
    
    const protein = (weight * 1.1).toFixed(0);

    
    document.querySelector('.result-line').style.display = 'block';
    results.innerHTML =`
    <p><strong>您的BMI:</strong>  <span class="result-value">${bmi.toFixed(1)}</span></p>
    <p><strong>您的基礎代謝率 (BMR):</strong>  <span class="result-value">${bmr.toFixed(0)} kcal</span></p>
    <p><strong>每日總熱量消耗約為 (TDEE):</strong> <span class="result-value"> ${tdee.toFixed(0)} kcal</span></p>
    <p><strong>您的理想體重為:</strong>  <span class="result-value">${ibw.toFixed(1)} kg</span></p>
    <p><strong>您的體脂率:</strong>  <span class="result-value">${bodyFat}%</span></p>
    <p><strong>建議每日蛋白質:</strong> <span class="result-value"> ${protein} g</span></p>
    `
    
    // 隨機出現鼓勵的話 (陣列)
    const quotes = [
        "健康，是最好的投資。",
        "每天多動一點，健康多一點。",
        "別等完美才開始，先開始才完美。",
        "你的身體值得最好的對待。",
        "持續的努力，比一時的衝刺更重要。",
        "流汗，是對身體最好的投資。",
        "進步一點，就是成就一點。"
      ];
    

    const randomQuotes = quotes[Math.floor(Math.random() * quotes.length)]
    results.innerHTML += `
    <p class="fitness-quote">${randomQuotes}</p>`

    results.scrollIntoView({ behavior: 'smooth' });


    
})
                

