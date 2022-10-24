Install:npm install -g

Run:npm run start

Queries:getRecipe,getRecipes,getUser

Mutations:signin,signout,login,logout,addIngredient,deleteIngredient,addRecipe

Hecho por José María Fernández y Gabriel Sosa Dubuc



curl --request POST --header 'content-type: application/json' --url 'http://www.houseserverjoso.xyz:4000/' --data '{"query":"query { __typename }"}'