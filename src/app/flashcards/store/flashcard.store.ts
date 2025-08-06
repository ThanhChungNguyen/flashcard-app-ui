import { Injectable, computed, inject } from '@angular/core';
import {
    signalStore,
    withState,
    withMethods,
    signalStoreFeature,
    patchState,
    withComputed
} from '@ngrx/signals';

export interface Card {
    front: string;
    back: string;
}

export interface FlashcardSet {
    id: string;
    title: string;
    cards: Card[];
}

interface FlashcardState {
    sets: FlashcardSet[];
}

const initialState: FlashcardState = {
    sets: []
};

export const createFlashcardStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        addSet(newSet: FlashcardSet) {
            patchState(store, (state) => ({
                ...state,
                sets: [...state.sets, newSet]
            }));
        },
        deleteSet(id: string) {
            patchState(store, (state) => ({
                ...state,
                sets: state.sets.filter((set) => set.id !== id)
            }));
        },
        addCard(setId: string, card: Card) {
            patchState(store, (state) => {
                const updatedSets = state.sets.map((set) =>
                    set.id === setId
                        ? { ...set, cards: [...set.cards, card] }
                        : set
                );
                return { ...state, sets: updatedSets };
            });
        },
        deleteCard(setId: string, cardIndex: number) {
            patchState(store, (state) => {
                const updatedSets = state.sets.map((set) =>
                    set.id === setId
                        ? {
                            ...set,
                            cards: set.cards.filter((_, i) => i !== cardIndex),
                        }
                        : set
                );
                return { ...state, sets: updatedSets };
            });
        },
    })),
    withComputed(({ sets }) => ({
        cardsCount: computed(() =>
            sets().reduce((total, set) => total + set.cards.length, 0)
        ),
    }))
);

@Injectable({ providedIn: 'root' })
export class FlashcardStore {
    private readonly store = inject(createFlashcardStore);

    // Selectors
    sets = this.store.sets;
    cardsCount = this.store.cardsCount;

    // Methods
    addSet = this.store.addSet;
    deleteSet = this.store.deleteSet;
}
