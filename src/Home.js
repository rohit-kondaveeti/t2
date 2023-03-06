import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Home = () => {
  const navigate = useNavigate();

  const [habits, setHabits] = useState([]);
  const [view, setView] = useState(false);
  const [count, setCount] = useState([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let status = [{ none: "", done: "", undone: "" }];

    if (localStorage.getItem("habits")) {
      setHabits(JSON.parse(localStorage.getItem("habits")));
    }

    setActive(true);
  }, []);

  const prepareDates = (date) => {
    let newDate = new Date();
    let tDate = new Date();
    const dates = [];
    for (let i = 0; i < 7; i++) {
      let day = new Date(newDate);
      day.setDate(day.getDate() + i);

      dates.push({
        date: formatDate(day.toDateString()),
        status: 0,
      });
    }
    return dates;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const enbleWeekView = () => {
    setView(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    habits.push({
      id: habits.length > 0 ? habits.length + 1 : 1,
      title: e.target.title.value,
      description: e.target.description.value,
      date: prepareDates(new Date()),
      done: 0,
      d: 0,
      n: 7,
      u: 0,
    });
    setHabits([...habits]);
    localStorage.setItem("habits", JSON.stringify(habits));
    document.getElementById("habit_form").reset();
    navigate("/");
    // window.location.href = "/";
  };

  const DeleteHabit = (index) => {
    habits.splice(index, 1);
    setHabits([...habits]);
    localStorage.setItem("habits", JSON.stringify(habits));
  };

  return (
    <>
      {active ? (
        <>
          <h1 className="Heading">Habit Tracker</h1>
          <button
            type="button"
            className="btn btn-primary back"
            data-bs-toggle="modal"
            data-bs-target="#addHabit"
            data-bs-whatever="@mdo"
          >
            Add Habit
          </button>

          {!view ? (
            habits.length > 0 ? (
              <div className="habits_data">
                {habits.map((habit, i) => (
                  <div key={i}>
                    <h3>{habit.title}</h3>
                    <p className="btns">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/habit/" + i)}
                      >
                        Weekview
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => DeleteHabit(i)}
                      >
                        Delete
                      </button>
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="noHabit">No Habits</p>
            )
          ) : (
            <h1>Test</h1>
          )}

          <div
            className="modal fade"
            id="addHabit"
            tabIndex="-1"
            aria-labelledby="addHabitLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <form onSubmit={submitHandler} id="habit_form">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="addHabitLabel">
                      Add Habit
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label
                        htmlFor="recipient-name"
                        className="col-form-label"
                      >
                        Habit Title
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Habit Title"
                        className="form-control"
                        id="title"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message-text" className="col-form-label">
                        Habit Description
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Habit Description"
                        className="form-control"
                        id="description"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Go Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Home;
