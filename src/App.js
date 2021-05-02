import logo from './logo.svg';
import './App.scss';
import ColorBox from './Components/ColorBox';
import './Components/ColorBox/ColorBox.scss'
import { useEffect, useState } from 'react';
import TodoList from './Components/TodoList';
import TodoForm from './Components/TodoForm';
import PostList from './Components/PostList';
import Pagination from './Components/Pagination';
import queryString from 'query-string';
import PostFilterForm from './Components/PostFilterForm';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "I love developer!" },
    { id: 2, title: "I love Reactjs!" },
    { id: 3, title: "I love Hooks!" },
    { id: 4, title: "I love developer!" },
    { id: 5, title: "I love Reactjs!" },
    { id: 6, title: "I love Hooks!" }

  ])
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
  })
  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
    //title_like: 'quis',
  })

  function handleTodoForm(formValue) {
    const newValue = {
      id: todoList.length + 1,
      ...formValue
    }
    const newTodoList = [...todoList];
    newTodoList.push(newValue);
    setTodoList(newTodoList);
  }

  function HandleTodoList(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;
    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }


  useEffect(() => {
    async function fetchPostList() {
      try {
        const queryParam = queryString.stringify(filter);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${queryParam}`;
        const reponse = await fetch(requestUrl);
        const responJSON = await reponse.json();
        console.log(responJSON);
        const { data, pagination } = responJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPostList();
  }, [filter]);

  function handlePageChange(newPage) {
    console.log(newPage);
    setFilter({
      ...filter,
      _page: newPage
    })
  }

  function handleFilterChange(newFilter) {
    console.log(newFilter);
    setFilter({
      ...filter,
      _page: 1,
      title_like: newFilter.searchTern,
    })
  }

  return (
    <div className="app">
      <h1>React Post List useEffect</h1>
      <PostFilterForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
      {/* <TodoForm onSubmit={handleTodoForm} />
      <TodoList todos={todoList} onTodoClick={HandleTodoList} /> */}
    </div>
  );
}

export default App;
