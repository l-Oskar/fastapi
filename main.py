from fastapi import FastAPI, HTTPException, Path, Query, Body
from typing import Optional, List, Dict, Annotated
from pydantic import BaseModel, Field

app = FastAPI()

class User(BaseModel):
    id: int
    name: str
    age: int

class Post(BaseModel):
    id: int
    title: str
    body: str
    author: User

class PostCreate(BaseModel):
    title: str
    body: str
    author_id: int

class UserCreate(BaseModel):
    name: Annotated[
        str, Field(..., title='User name', min_length=2, max_length=20)
    ]
    age: Annotated[
        int, Field(..., title='User age', ge=1, le=120)
    ]

@app.get('/')
def home() -> dict[str, str]:
    return {"data": "message"}

@app.get('/contacts')
def getContact() -> int:
    return 222


users = [
    {'id': 1, 'name': 'John', 'age': 30},
    {'id': 2, 'name': 'Alex', 'age': 13},
    {'id': 3, 'name': 'Bob', 'age': 21},
]

posts = [
    {'id': 1, 'title': 'News 1', 'body': 'Text 1', 'author': users[1]},
    {'id': 2, 'title': 'News 2', 'body': 'Text 2', 'author': users[0]},
    {'id': 3, 'title': 'News 3', 'body': 'Text 3', 'author': users[2]}
]

@app.get('/users')
async def getAllUsers() -> List[dict]:
    return users

@app.post('/items/add')
async def addItem(post: PostCreate) -> Post:
    author = next((user for user in users if user['id'] == post.author_id), None)
    if not author:
        raise HTTPException(status_code=404, detail='User not found')
    new_post_id = len(posts) + 1

    new_post = {'id': new_post_id,
        'title': post.title,
        'body': post.body,
        'author': author}
    posts.append(new_post)
    
    return Post(**new_post)

@app.post('/user/add')
async def addUser(user: Annotated[
    UserCreate,
    Body(..., example={
        'name': 'UserName',
        'age': 1
    })
]) -> User:
    new_user_id = len(users) + 1

    new_user = {
        'id': new_user_id,
        'name': user.name,
        'age': user.age,
    }

    users.append(new_user)
    return User(**new_user)

@app.get('/posts/{id}')
async def getPost(id: int) -> dict:
    for post in posts:
        if post['id'] == id:
            return post
        
    raise HTTPException(status_code=404, detail='Post not found')


@app.get('/items')
async def getItems() -> List[Post]:
    return [Post(**post) for post in posts]

@app.get('/items/{id}')
async def getItem(id: Annotated[int, Path(..., title='Id for user', ge=1, lt=100)]) -> Post:
    for post in posts:
        if post['id'] == id:
            return Post(**post)
        
    raise HTTPException(status_code=404, detail='Not found')


@app.get('/search')
async def search(post_id: Annotated[
    Optional[int],
    Query(title='ID of post to search', ge=1, le=100)
]) -> Dict[str, Optional[Post]]:
    if post_id:
        for post in posts:
            if post['id'] == post_id:
                return {'data' : Post(**post)}
            
        raise HTTPException(status_code=404, detail='Post not found')
    else:
        return {"data" : None}
    
