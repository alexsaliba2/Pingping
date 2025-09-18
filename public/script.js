// Ping Pong Paradise Interactive Application

class PingPongApp {
    constructor() {
        this.currentSection = 'home';
        this.currentTechnique = 'forehand';
        this.quizData = [
            {
                question: "What is the official diameter of a ping pong ball?",
                options: ["38mm", "40mm", "42mm", "44mm"],
                correct: 1
            },
            {
                question: "How many points do you need to win a game?",
                options: ["11 points", "15 points", "21 points", "25 points"],
                correct: 0
            },
            {
                question: "What is the height of a ping pong net?",
                options: ["5 inches", "6 inches", "7 inches", "8 inches"],
                correct: 1
            },
            {
                question: "How often do players alternate serves?",
                options: ["Every point", "Every 2 points", "Every 3 points", "Every 5 points"],
                correct: 1
            },
            {
                question: "What was ping pong originally called?",
                options: ["Table Tennis", "Whiff-Whaff", "Paddle Ball", "Indoor Tennis"],
                correct: 1
            }
        ];
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        this.init();
    }

    init() {
        this.bindEvents();
        this.showSection('home');
        this.showTechnique('forehand');
        this.loadQuizQuestion();
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.dataset.section;
                this.showSection(section);
            });
        });

        // Technique selector
        document.querySelectorAll('.technique-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const technique = e.target.dataset.technique;
                this.showTechnique(technique);
            });
        });

        // Quiz functionality
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quiz-option')) {
                this.handleQuizAnswer(e.target);
            }
        });

        document.getElementById('restart-quiz').addEventListener('click', () => {
            this.restartQuiz();
        });
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        document.getElementById(sectionId).classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        this.currentSection = sectionId;
        this.showNotification(`Navigated to ${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} section! 🏓`, 'info');
    }

    showTechnique(techniqueId) {
        // Hide all technique info
        document.querySelectorAll('.technique-info').forEach(info => {
            info.classList.remove('active');
        });

        // Show selected technique
        document.getElementById(techniqueId).classList.add('active');

        // Update technique buttons
        document.querySelectorAll('.technique-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-technique="${techniqueId}"]`).classList.add('active');

        this.currentTechnique = techniqueId;
    }

    loadQuizQuestion() {
        if (this.currentQuizQuestion >= this.quizData.length) {
            this.showQuizResults();
            return;
        }

        const question = this.quizData[this.currentQuizQuestion];
        const questionContainer = document.getElementById('quiz-question');
        
        questionContainer.innerHTML = `
            <h3>Question ${this.currentQuizQuestion + 1} of ${this.quizData.length}</h3>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option" data-answer="${index}">${option}</button>
                `).join('')}
            </div>
        `;
    }

    handleQuizAnswer(button) {
        const selectedAnswer = parseInt(button.dataset.answer);
        const correctAnswer = this.quizData[this.currentQuizQuestion].correct;
        const isCorrect = selectedAnswer === correctAnswer;

        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.disabled = true;
            const answerIndex = parseInt(option.dataset.answer);
            
            if (answerIndex === correctAnswer) {
                option.classList.add('correct');
            } else if (answerIndex === selectedAnswer && !isCorrect) {
                option.classList.add('wrong');
            }
        });

        if (isCorrect) {
            this.quizScore++;
            this.showNotification('Correct! Great job! 🎉', 'success');
        } else {
            this.showNotification('Oops! That\'s not right. 🤔', 'error');
        }

        // Update score display
        document.getElementById('score').textContent = this.quizScore;

        // Move to next question after delay
        setTimeout(() => {
            this.currentQuizQuestion++;
            this.loadQuizQuestion();
        }, 2000);
    }

    showQuizResults() {
        const percentage = Math.round((this.quizScore / this.quizData.length) * 100);
        let message = '';
        let emoji = '';

        if (percentage >= 80) {
            message = 'Excellent! You\'re a ping pong expert!';
            emoji = '🏆';
        } else if (percentage >= 60) {
            message = 'Good job! You know your ping pong!';
            emoji = '🏓';
        } else {
            message = 'Keep learning! Practice makes perfect!';
            emoji = '📚';
        }

        document.getElementById('quiz-question').innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">${emoji}</div>
                <h3>Quiz Complete!</h3>
                <p style="font-size: 1.2rem; margin: 1rem 0;">
                    You scored ${this.quizScore} out of ${this.quizData.length} (${percentage}%)
                </p>
                <p style="font-size: 1.1rem; color: #666;">${message}</p>
            </div>
        `;

        this.showNotification(`Quiz completed! You scored ${percentage}%! ${emoji}`, 'success');
    }

    restartQuiz() {
        this.currentQuizQuestion = 0;
        this.quizScore = 0;
        document.getElementById('score').textContent = '0';
        this.loadQuizQuestion();
        this.showNotification('Quiz restarted! Good luck! 🍀', 'info');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '10px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '350px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
        });

        // Set background color based on type
        const colors = {
            success: '#4ecdc4',
            error: '#ff6b6b',
            info: '#667eea'
        };
        notification.style.background = colors[type] || colors.info;

        // Add to DOM and animate in
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pingPongApp = new PingPongApp();
    
    // Welcome message
    setTimeout(() => {
        window.pingPongApp.showNotification('Welcome to Ping Pong Paradise! 🏓 Explore and learn!', 'success');
    }, 1000);
});
