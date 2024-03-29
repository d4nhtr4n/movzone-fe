import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";

import tmdbApi from "~/api/tmdbApi";
import { category } from "~/api/constant";
import Button from "../Button";
import FollowButton from "../FollowButton";
import Image from "../Image";

import style from "./ViewingHeading.module.scss";

const cx = classNames.bind(style);

function ViewingHeading({ data }) {
    const [disableWatching, setDisableWatching] = useState(false);
    function handleWatchUrl() {
        let watchUrl = `/watch/${data.media_type}/${data.id}`;
        if (
            data &&
            data.media_type === category.tv &&
            data.last_episode_to_air
        ) {
            watchUrl = watchUrl.concat(
                "",
                `/${data.last_episode_to_air.season_number}/${data.last_episode_to_air.episode_number}/`
            );
        }
        return watchUrl;
    }

    useEffect(() => {
        if (
            data.media_type === category.movie &&
            (!data.release_date || Date.now() - Date.parse(data.release_date)) <
                0
        ) {
            setDisableWatching(true);
        } else setDisableWatching(false);
    }, [data]);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("background")}>
                <Image
                    className={cx("backdrop")}
                    src={tmdbApi.getOriginalImage(data.backdrop_path)}
                />
            </div>
            <div className={cx("inner")}>
                <div className={cx("container")}>
                    <Image
                        className={cx("poster")}
                        src={tmdbApi.getW500Image(data.poster_path)}
                    />
                    <div className={cx("content")}>
                        <span className={cx("name")}>
                            {data.title || data.name}
                        </span>
                        {data.tagline && (
                            <q className={cx("tag-line")}>{data.tagline}</q>
                        )}
                        <div className={cx("info")}>
                            <div className={cx("info-list")}>
                                <ul className={cx("genre-list")}>
                                    {data.genres.map((genre, index) => (
                                        <li key={index}>{genre.name}</li>
                                    ))}
                                </ul>
                                {data.production_countries.length > 0 && (
                                    <p className={cx("countries")}>
                                        {data.production_countries
                                            .map((country) => country.name)
                                            .join(", ")}
                                    </p>
                                )}
                                <div>
                                    <div className={cx("rating")}>
                                        <div
                                            className={cx("rating-fill")}
                                            style={{
                                                width: `${
                                                    data.vote_average * 10
                                                }%`,
                                            }}
                                        >
                                            <span>★★★★★</span>
                                        </div>
                                        <div className={cx("rating-empty")}>
                                            <span>☆☆☆☆☆</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("actions")}>
                                <div>
                                    <Button
                                        to={handleWatchUrl()}
                                        className={cx("button")}
                                        primary
                                        disabled={disableWatching}
                                        leftIcon={
                                            <FontAwesomeIcon icon={faPlay} />
                                        }
                                    >
                                        Watch
                                    </Button>
                                </div>

                                <FollowButton text data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx("overlay")}></div>
        </div>
    );
}

export default ViewingHeading;
