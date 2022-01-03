import React from "react";
import {Component} from "react";
import {ListGroup} from "../../common/listGroup";
import {getGenres} from "../../../services/roomGenreService";
import {getRooms} from "../../../services/roomService";
import SearchBoxForm from "./SearchBoxForm";
import HomeTable from "./homeTable";
import Pagination from "../../common/pagination";
import Link from "react-router-dom/Link";
import auth from "../../../services/authService";
import {getPageData} from "../../../helperFunctions/getPageData";

class Home extends Component {
    state = {
        rooms: [],
        genres: [],
        selectedGenre: "",
        searchQuery: "",
        pageSize: 3,
        currentPage: 1,
        sortColumn: { path: '_id', order: 'asc' }
    };

    componentDidMount() {
        const data = getGenres();
        const { data: rooms } = getRooms();
        const genres = [ { _id: "", name: "All Rooms" }, ...data ];
        this.setState({ rooms, genres });
    }

    render() {
        const { rooms: allRooms, genres, selectedGenre, searchQuery, pageSize, currentPage, sortColumn } = this.state;

        const {length, filteredRooms} = getPageData(allRooms, selectedGenre, pageSize, currentPage, sortColumn, searchQuery);

        const user = auth.getCurrentUser();

        return(
            <div>
                <h1>Home Page</h1>

                <div className={"row"}>

                    <div className={"col-3"}>
                        <ListGroup
                            genres={genres}
                            selectedGenre={selectedGenre}
                            onSelectedGenre={this.handleSelectedGenre}
                        />
                    </div>

                    <div className={"col"}>
                        <SearchBoxForm
                            value={searchQuery}
                            onChange={this.handleSearch}
                        />

                        <HomeTable
                            filteredRooms={filteredRooms}
                            onSort={this.handleSort}
                            sortColumn={sortColumn}
                        />

                        <Pagination
                            pageSize={pageSize}
                            length={length}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>

                { user && user.isAdmin &&
                    <React.Fragment>

                        <h1> To add a new Room </h1>

                        <Link
                            to={"/home/new"}
                            className={"btn btn-outline-info"}
                            style={{marginBottom: 20}}>
                            New Room
                        </Link>

                    </React.Fragment>
                }

            </div>
        );
    }

    handleSelectedGenre = genre => {
        this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
    };

    handleSearch = query => {
      this.setState({ searchQuery: query, selectedGenre: "", currentPage: 1 });
    };

    handleSort = path => {
        const sortColumn = {...this.state.sortColumn};
        if(sortColumn.path === path)
            sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
        else{
            sortColumn.path = path;
            sortColumn.order = 'asc';
        }
        this.setState({ sortColumn });
    };

    handlePageChange = page => {
     this.setState({ currentPage: page })
    };
};

export default Home;