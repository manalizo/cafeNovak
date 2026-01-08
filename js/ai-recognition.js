

let beverageModel;


async function loadBeverageModel() {
    try {
        console.log(' Loading MobileNet model for beverage recognition...');
        
        const statusElement = document.getElementById('ai-status');
        if (statusElement) {
            statusElement.innerHTML = 'Chargement du modèle IA...';
            statusElement.className = 'status info';
        }
        
        // Load the MobileNet model
        beverageModel = await mobilenet.load();
        
        console.log(' MobileNet model loaded successfully!');
        
        if (statusElement) {
            statusElement.innerHTML = 'Modèle IA prêt! Téléchargez une image pour commencer.';
            statusElement.className = 'status success';
        }
        
    } catch (error) {
        console.error(' Error loading beverage model:', error);
        
        const statusElement = document.getElementById('ai-status');
        if (statusElement) {
            statusElement.innerHTML = ' Erreur lors du chargement. Veuillez rafraîchir la page.';
            statusElement.className = 'status error';
        }
    }
}

// Load model when page is ready
window.addEventListener('load', () => {
    // Small delay to let other scripts load first
    setTimeout(loadBeverageModel, 500);
});

const beverageUploadInput = document.getElementById('beverageImageUpload');
if (beverageUploadInput) {
    beverageUploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (!file) {
            return;
        }
        
        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner une image!');
            return;
        }
        
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('L\'image est trop grande. Maximum 10MB.');
            return;
        }
        
        // Read and display the image
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const img = document.getElementById('beverageImagePreview');
            
            if (img) {
                img.src = e.target.result;
                img.style.display = 'block';
                
                // Animate image appearance
                img.style.opacity = '0';
                img.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }, 10);
                
                // When image loads, classify it
                img.onload = function() {
                    classifyBeverageImage(img);
                };
            }
        };
        
        reader.onerror = function() {
            alert('Erreur lors de la lecture du fichier.');
        };
        
        reader.readAsDataURL(file);
    });
}


async function classifyBeverageImage(imageElement) {
    const loadingElement = document.getElementById('ai-loading');
    const resultsElement = document.getElementById('ai-results');
    
    // Check if model is loaded
    if (!beverageModel) {
        if (resultsElement) {
            resultsElement.innerHTML = `
                <div class="status error">
                    Le modèle IA n'est pas encore chargé. Veuillez attendre quelques secondes.
                </div>
            `;
        }
        return;
    }
    
    // Show loading
    if (loadingElement) {
        loadingElement.style.display = 'block';
        loadingElement.style.opacity = '0';
        setTimeout(() => {
            loadingElement.style.transition = 'opacity 0.3s ease';
            loadingElement.style.opacity = '1';
        }, 10);
    }
    
    if (resultsElement) {
        resultsElement.innerHTML = '';
    }
    
    try {
        console.log(' Classifying beverage image...');
        
        // Classify the image (returns top 3 predictions by default)
        const predictions = await beverageModel.classify(imageElement);
        
        console.log('Predictions:', predictions);
        
        // Hide loading
        if (loadingElement) {
            loadingElement.style.opacity = '0';
            setTimeout(() => {
                loadingElement.style.display = 'none';
            }, 300);
        }
        
        // Display results
        displayBeverageResults(predictions);
        
    } catch (error) {
        console.error(' Error classifying beverage image:', error);
        
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        if (resultsElement) {
            resultsElement.innerHTML = `
                <div class="status error">
                    Erreur lors de l'analyse. Veuillez réessayer avec une autre image.
                </div>
            `;
        }
    }
}


function displayBeverageResults(predictions) {
    const resultsElement = document.getElementById('ai-results');
    
    if (!resultsElement) return;
    
    // Create results container
    let html = '<div class="ai-results-header"><h3>Résultats de l\'analyse:</h3></div>';
    html += '<div class="ai-predictions">';
    
    // Display top predictions
    predictions.forEach((prediction, index) => {
        const confidence = (prediction.probability * 100).toFixed(1);
        const isHighConfidence = prediction.probability > 0.5;
        
        html += `
            <div class="ai-prediction-card ${isHighConfidence ? 'high-confidence' : ''}">
                <div class="prediction-rank">#${index + 1}</div>
                <div class="prediction-content">
                    <div class="prediction-label">${prediction.className}</div>
                    <div class="prediction-confidence">
                        <div class="confidence-bar">
                            <div class="confidence-fill" style="width: ${confidence}%"></div>
                        </div>
                        <span class="confidence-text">${confidence}%</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    // Add café suggestions based on detected items
    html += generateCafeSuggestions(predictions);
    
    resultsElement.innerHTML = html;
    
    // Animate results
    const predictionCards = resultsElement.querySelectorAll('.ai-prediction-card');
    predictionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
}


function generateCafeSuggestions(predictions) {
    // Keywords for different beverage types
    const beverageKeywords = {
        coffee: ['coffee', 'espresso', 'cappuccino', 'latte', 'mocha', 'americano', 'macchiato'],
        tea: ['tea', 'teapot', 'teacup'],
        hot: ['cup', 'mug', 'hot'],
        cold: ['glass', 'ice', 'cold', 'iced'],
        dessert: ['cake', 'pastry', 'cookie', 'croissant', 'dessert', 'chocolate']
    };
    
    // Analyze predictions
    let detectedTypes = {
        coffee: false,
        tea: false,
        hot: false,
        cold: false,
        dessert: false
    };
    
    predictions.forEach(pred => {
        const label = pred.className.toLowerCase();
        
        Object.keys(beverageKeywords).forEach(type => {
            beverageKeywords[type].forEach(keyword => {
                if (label.includes(keyword)) {
                    detectedTypes[type] = true;
                }
            });
        });
    });
    
    // Generate suggestions
    let suggestions = [];
    
    if (detectedTypes.coffee) {
        suggestions.push({
     
            title: 'Espresso ',
            description: 'Notre signature avec des grains d\'Éthiopie',
            price: '10 DH'
        });
        suggestions.push({
   
            title: 'Croissant Artisanal',
            description: 'Parfait avec votre café',
            price: '8 DH'
        });
    }
    
    if (detectedTypes.tea) {
        suggestions.push({
           
            title: 'Thé à la Menthe',
            description: 'Thé traditionnel marocain',
            price: '8 DH'
        });
        suggestions.push({
         
            title: 'Biscuits Maison',
            description: 'Accompagnement idéal',
            price: '5 DH'
        });
    }
    
    if (detectedTypes.cold) {
        suggestions.push({
        
            title: 'Iced Latte',
            description: 'Rafraîchissant et crémeux',
            price: '18 DH'
        });
    }
    
    if (detectedTypes.dessert || suggestions.length === 0) {
        suggestions.push({
        
            title: 'Gâteau du Jour',
            description: 'Fait maison chaque matin',
            price: '15 DH'
        });
        suggestions.push({
          
            title: 'Cappuccino',
            description: 'Classique et onctueux',
            price: '15 DH'
        });
    }
    
    // Limit to 3 suggestions
    suggestions = suggestions.slice(0, 3);
    
    if (suggestions.length === 0) return '';
    
    // Build HTML
    let html = `
        <div class="ai-suggestions">
            <h3> Nos Recommandations</h3>
            <p class="suggestions-subtitle">Basé sur votre image, vous pourriez aimer:</p>
            <div class="suggestions-grid">
    `;
    
    suggestions.forEach(item => {
        html += `
            <div class="suggestion-card">
             
                <div class="suggestion-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <div class="suggestion-price">${item.price}</div>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
            <div class="suggestion-cta">
                <a href="pages/menu.html" class="btn">Voir le Menu Complet</a>
            </div>
        </div>
    `;
    
    return html;
}



// Check if TensorFlow is loaded
function checkTensorFlowLoaded() {
    if (typeof tf === 'undefined') {
        console.error('TensorFlow.js not loaded');
        return false;
    }
    if (typeof mobilenet === 'undefined') {
        console.error('MobileNet not loaded');
        return false;
    }
    return true;
}

// Console greeting
console.log(' AI Beverage Recognition initialized');
console.log(' Using TensorFlow.js with MobileNet');
