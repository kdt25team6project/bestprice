import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeDetail.css';
import Fuse from 'fuse.js';


const normalizeSearchTerm = (term) =>
  term.trim().toLowerCase().replace(/\s+/g, '_');

const findIngredient = (name, data) => {
  const normalizedName = normalizeSearchTerm(name);

  const fusePrimary = new Fuse(data, {
    keys: ['식품명'], 
    threshold: 0.5,
    includeScore: true 
  });

  let result = fusePrimary.search(normalizedName);

  // 가장 유사한 결과 반환
  return result.length > 0 ? result[0].item : null;
};


const parseQuantity = (quantity) => {
  const match = quantity.match(/(\d+)([a-z가-힣]+)/i);
  if (match) {
    return { amount: parseFloat(match[1]), unit: match[2] };
  }
  return { amount: 1, unit: '' };
};

const conversionTable = {
  'C': 240,  // 컵
  'T': 15,   // 큰술
  't': 5,    // 작은술
  '개': 50,  // 개 (대략적)
  '마리': 100, // 마리 (대략적)
  'g': 1,    // g 그대로 사용
  'kg': 1000, // kg -> g
};

const unitToGrams = (amount, unit, density = 1) => {
  if (unit === 'ml') {
    return amount * density;
  }
  return amount * (conversionTable[unit] || 1); 
};

function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const [nutritionData, setNutritionData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [appliedIngredients, setAppliedIngredients] = useState([]);

  const recipeId = 128932;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8001/api/recipes/${recipeId}`)
      .then((response) => {
        setRecipe(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('레시피를 불러오는 데 실패했습니다.');
        setLoading(false); 
      });
  }, [recipeId]);
  
  useEffect(() => {
    setLoading(true);
    fetch('/nutrition_data.json')
      .then((response) => response.json())
      .then((data) => {
        setNutritionData(data.records || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('영양 데이터 로드 실패:', error);
        setLoading(false); 
      });
  }, []);
  
  if (loading) return <p>로딩 중...</p>; 
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>레시피가 없습니다.</p>;

  // 재료를 타입별로 그룹화 (예: '재료' 섹션 등)
  const groupedIngredients = recipe.ingredientsList.reduce((acc, item) => {
    if (!acc[item.sectionName]) acc[item.sectionName] = [];
    acc[item.sectionName].push(item);
    return acc;
  }, {});


  
    // 영양 성분 계산 함수

  const calculateNutrition = () => {
    if (!recipe) return;

    let totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    let calculatedIngredients = [];

    recipe.ingredientsList.forEach((ingredient) => {
      const { name, amount } = ingredient;
      const parsedQuantity = parseQuantity(amount || '1개');
      const found = findIngredient(name, nutritionData);

      if (found) {
        const grams = unitToGrams(parsedQuantity.amount, parsedQuantity.unit);
        totalNutrition.calories += (found['에너지(kcal)'] / 100) * grams;
        totalNutrition.protein += (found['단백질(g)'] / 100) * grams;
        totalNutrition.carbs += (found['탄수화물(g)'] / 100) * grams;
        totalNutrition.fat += (found['지방(g)'] / 100) * grams;

        calculatedIngredients.push({ usedName: name, matchedName: found['식품명'] });
      }
    });
    setResult(totalNutrition);
    setAppliedIngredients(calculatedIngredients);
  };

  return (
    <div className="recipe-container">
      {/* 레시피 상단 이미지 */}
      <div className="recipe-image">
        <img src={recipe.mainThumb} alt={recipe.title} />
      </div>

      {/* 레시피 기본 정보 */}
      <div className="recipe-header">
        <div className="recipe-title">{recipe.title}</div>
        <div className="recipe-summary">{recipe.description}</div>
        <div className="recipe-info">
          <span>
            <img src="/icon_person.png" alt="인분" /> {recipe.servings}
          </span>
          <span>
            <img src="/icon_time.png" alt="시간" /> {recipe.timeRequired}
          </span>
          <span>
            <img src="/icon_level.png" alt="난이도" /> {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* 재료 목록 */}
      <div className="recipe-box">
        <dl className="recipe-ingredients">
          {Object.entries(groupedIngredients).map(([section, items]) => (
            <React.Fragment key={section}>
              <dt><span>{section}</span></dt>
              <dd>
                <ul className="ingredient-list">
                  {items.map((item) => (
                    <li key={item.id}>
                      <div className="ingredient-list_1">
                        <div className="ingredient-name">{item.name}</div>
                        <span className="ingredient-amount">{item.amount}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </div>

      <button className='serch-button 'onClick={calculateNutrition}>
        영양 성분 계산
      </button>

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>총 영양 성분</h2>
          <p>칼로리: {result.calories.toFixed(2)} kcal</p>
          <p>단백질: {result.protein.toFixed(2)} g</p>
          <p>탄수화물: {result.carbs.toFixed(2)} g</p>
          <p>지방: {result.fat.toFixed(2)} g</p>
        </div>
      )}

      {appliedIngredients.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>영양 성분이 계산된 재료</h2>
          <ul>
            {appliedIngredients.map((ingredient, index) => (
              <li key={index}>
                사용된 이름: {ingredient.usedName}, 매칭된 식품명: {ingredient.matchedName}
              </li>
            ))}
          </ul>
        </div>
      )}


      <div className="view3_box_tit">조리 순서</div>
        <ul className="step_list st_thumb">
          {recipe.steps.map((step) => (
            <li key={step.step}>
              <div className="step_list_num">
                <span>STEP</span> {step.stepOrder} <span>/ {recipe.steps.length}</span>
              </div>
              <div className="step_list_txt">
                <div className="step_list_txt_cont">{step.step}</div>
              </div>
              <div className="step_list_txt_pic">
                {step.stepImg && (
                  <img src={step.stepImg} alt="" />
                )}
              </div>
            </li>
          ))}
        </ul>
    </div>
  );
}

export default RecipeDetail;
