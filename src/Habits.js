import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Habits = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [habit, setHabit] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setHabit(JSON.parse(localStorage.getItem("habits"))[id]);
    console.log(JSON.parse(localStorage.getItem("habits")));
  }, []);

  const statusChangeHandler = (value, i) => {
    const habits = JSON.parse(localStorage.getItem("habits"));
    habit.date[i].status = value;
    setHabit({ ...habit });
    habits[id] = habit;
    localStorage.setItem("habits", JSON.stringify(habits));
  };
  const backHome = (e) => {
    e.preventDefault();

    navigate("/");
  };
  return (
    <>
      {habit ? (
        <>
          <div className="text-center">
            <h1>{habit.title}</h1>
            <p>{habit.description}</p>
          </div>
          <div className="habits">
            {habit.date
              ? habit.date.map((item, i) => (
                  <div
                    key={i}
                    className={
                      item.status == 1
                        ? "done"
                        : item.status == 2
                        ? "undone"
                        : "none"
                    }
                  >
                    <p>{item.date}</p>
                    <select
                      onChange={(e) => statusChangeHandler(e.target.value, i)}
                      value={item.status}
                    >
                      <option value="0">None</option>
                      <option value="1">Done</option>
                      <option value="2">Undone</option>
                    </select>
                  </div>
                ))
              : null}
          </div>
          <a className="btn btn-primary back" onClick={backHome}>
            Back
          </a>
        </>
      ) : null}
    </>
  );
};

export default Habits;
