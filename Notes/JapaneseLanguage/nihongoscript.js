        // Tab switching logic for the Japanese Levels
        function switchLevel(levelId) {
            // Remove active classes from all buttons
            const buttons = document.querySelectorAll('.tab-btn');
            buttons.forEach(btn => btn.classList.remove('active'));

            // Remove active classes from all content panels
            const panels = document.querySelectorAll('.level-panel');
            panels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and target panel
            event.target.classList.add('active');
            document.getElementById('panel-' + levelId).classList.add('active');
        }

        // Flashcards Database
        const flashcardsData = [
            { kana: 'あ', romaji: 'a', hint: 'Pronounced like "ah" in car' },
            { kana: 'い', romaji: 'i', hint: 'Pronounced like "ee" in meet' },
            { kana: 'う', romaji: 'u', hint: 'Pronounced like "oo" in boot' },
            { kana: 'え', romaji: 'e', hint: 'Pronounced like "eh" in let' },
            { kana: 'お', romaji: 'o', hint: 'Pronounced like "oh" in boat' }
        ];

        let currentIndex = 0;
        const cardElement = document.getElementById('card');
        const kanaDisplay = document.getElementById('kana-display');
        const romajiDisplay = document.getElementById('romaji-display');
        const hintDisplay = document.getElementById('hint-display');

        // Flip Card Action
        function flipCard() {
            cardElement.classList.toggle('flipped');
        }

        // Advance to Next Flashcard
        function nextCard(event) {
            // Stop click event from bubbling up and automatically flipping the card immediately
            event.stopPropagation();
            
            // Ensure card is back to front side before changing data
            cardElement.classList.remove('flipped');
            
            setTimeout(() => {
                // Pick a new index (different from current)
                let newIndex = Math.floor(Math.random() * flashcardsData.length);
                while(newIndex === currentIndex) {
                    newIndex = Math.floor(Math.random() * flashcardsData.length);
                }
                currentIndex = newIndex;

                // Load new data into elements
                kanaDisplay.textContent = flashcardsData[currentIndex].kana;
                romajiDisplay.textContent = flashcardsData[currentIndex].romaji;
                hintDisplay.textContent = flashcardsData[currentIndex].hint;
            }, 200); // Small timeout to match css flip transition timing reset
        }
  