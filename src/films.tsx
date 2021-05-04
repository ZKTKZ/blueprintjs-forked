/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { MenuItem } from "@blueprintjs/core";
import { ItemPredicate, ItemRenderer } from "@blueprintjs/select";
import * as React from "react";

export interface ISong {
  /** Title of film. */
  title: string;
  /** Artist name. */
  artist: string;
}

export const TOP_100_FILMS: ISong[] = [
  { title: "Wait For It", artist: "Lin Manuel Miranda" }
].map((m, index) => ({ ...m }));

export const renderFilm: ItemRenderer<ISong> = (
  film,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${film.title}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={film.artist.toString()}
      key={film.title}
      onClick={handleClick}
      text={highlightText(text, query)}
    />
  );
};

export const filterFilm: ItemPredicate<ISong> = (query, film) => {
  return (
    `${film.title.toLowerCase()} ${film.artist}`.indexOf(
      query.toLowerCase()
    ) >= 0
  );
};

function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

export const filmSelectProps = {
  itemPredicate: null,
  itemRenderer: renderFilm,
  items: TOP_100_FILMS
};
