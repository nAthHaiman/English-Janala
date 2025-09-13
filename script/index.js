// to get all synonyms
const createSynonym = (member) => {
    const synonymElements = member.map((el) => `<span class="btn">${el}</span>`);
    return synonymElements.join(" ");
}

const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    }
    else{
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('word-container').classList.remove('hidden')
    }
}

const loadAllLes = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(info => displayLesson(info.data));
}

const removeactive = () => {
    const getbtnALL = document.querySelectorAll('.les-btn');
    getbtnALL.forEach(indiBtn => indiBtn.classList.remove('active'));
}

const LoadElement = (id) => {
     manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    console.log(id);
    
    fetch(url)
        .then(res => res.json())
        .then((outcome) => {
            removeactive();
            const catchbtn = document.getElementById(`lesson-btn-${id}`);
            // console.log(catchbtn);
            catchbtn.classList.add('active');
            displayOutcomes(outcome.data)
        })

}

const loadWordDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(worddetails => displaywords(worddetails.data));
}






const displaywords = (wordDet) => {
    console.log(wordDet);

    const detailsBox = document.getElementById("details-conatiner");
    detailsBox.innerHTML = `
                  <div class="">
                    <h2 class="text-2xl font-bold">${wordDet.word} (  <i class="fa-solid fa-microphone-lines"></i> :${wordDet.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>${wordDet.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${wordDet.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Synonyms</h2>
                    <div>${createSynonym(wordDet.synonyms)}</div>
                </div>
                `
    document.getElementById("my_modal_5").showModal();
}

const displayOutcomes = (objects) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (objects.length == 0) {
        wordContainer.innerHTML = `
        <div class="bg-gray-150 font-bangla  text-center col-span-full rounded-xl space-y-5 py-7">
            
            <img class="mx-auto" src= "./assets/alert-error.png"/>
            <p class="text-xl font-medium text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="font-bold text-4xl">নেক্সট Lesson এ যান</p>

        </div>
        `
        manageSpinner(false);
        return;
    }

    for (let object of objects) {
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
            <div class="bg-white rounded-2xl shadow-sm text-center px-5 py-8">
            <h2 class="font-bold text-xl mb-6">${object.word}</h2>
            <p class="font-semibold mb-6">Meaning /Pronounciation</p>
            
            
            <div class="font-bangla text-2xl font-medium">"${object.meaning ? object.meaning : "Cannot get meaning"} / ${object.pronunciation ? object.pronunciation : 'Cannot get pronounciation'}"</div>
            <div class="flex justify-between items-center">
                <button onClick="loadWordDetails(${object.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        wordContainer.appendChild(wordCard);

    }
    manageSpinner(false);
}


const displayLesson = (Lessons) => {
    // 1. get the container & make empty 
    // 2. go to every lessons 
    // 3. create element
    const allLessonContainer = document.getElementById('lesson-container');
    allLessonContainer.innerText = '';
    console.log(Lessons);

    for (let lesson of Lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="LoadElement(${lesson.level_no})" href="" class="btn btn-outline btn-primary les-btn"><i
        class="fa-solid fa-arrow-right-from-bracket"></i>Lesson ${lesson.level_no}</button>
        `

        allLessonContainer.append(btnDiv);
    }
}

// ekhane ei jaigai display lesson dile hbena , karon display lesson only 
//  info ta  nicche fetch korche na. 

loadAllLes();


document.getElementById('btn-search').addEventListener('click' , ()=>{
    const inputdata = (document.getElementById('input-data')).value;
    const finaldata = inputdata.trim().toLowerCase();
    
    manageSpinner(true);

    fetch('https://openapi.programming-hero.com/api/words/all')
   
    .then(res => res.json())
    .then(searched => {
        const allsearched = searched.data;
        const filtersearch = allsearched.filter(elw => elw.word.toLowerCase().includes(finaldata));
        displayOutcomes(filtersearch);
        manageSpinner(false);
    }
)
     
})