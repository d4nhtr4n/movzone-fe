import axiosClient from "./axiosClient";
import { category, movieType, tvType } from "./constant";

const tmdbApi = {
    getTrendingList: (category, params) => {
        const url = `trending/${category}/week`;
        return axiosClient.get(url, params);
    },
    getMoviesList: (type, params) => {
        const url = `movie/${movieType[type]}`;
        return axiosClient.get(url, params);
    },
    getTvList: (type, params) => {
        const url = `tv/${tvType[type]}`;
        return axiosClient.get(url, params);
    },
    getVideos: (cate, id) => {
        const url = `${category[cate]}/${id}/videos`;
        return axiosClient.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = `search/${category[cate]}`;
        return axiosClient.get(url, params);
    },
    discover: (cate, params) => {
        const url = `discover/${category[cate]}`;
        return axiosClient.get(url, params);
    },
    detail: (cate, id, params) => {
        const url = `${category[cate]}/${id}`;
        return axiosClient.get(url, params);
    },
    credits: (cate, id) => {
        const url = `${category[cate]}/${id}/credits`;
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = `${category[cate]}/${id}/similar`;
        return axiosClient.get(url, { params: {} });
    },
    getTVSeasons: (id, season_number) => {
        const url = `tv/${id}/season/${season_number}`;
        return axiosClient.get(url, { params: {} });
    },
    getGenres: () => {
        const url = `/genre/movie/list`;
        return axiosClient.get(url, { params: {} });
    },
    getOriginalImage: (imgPath) =>
        `https://image.tmdb.org/t/p/original/${imgPath}`,
    getW500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
    getW200Image: (imgPath) => `https://image.tmdb.org/t/p/w200/${imgPath}`,
};

export default tmdbApi;
