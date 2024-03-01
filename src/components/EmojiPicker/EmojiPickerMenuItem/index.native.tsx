import React, {useEffect, useRef} from 'react';
import PressableWithoutFeedback from '@components/Pressable/PressableWithoutFeedback';
import Text from '@components/Text';
import useStyleUtils from '@hooks/useStyleUtils';
import useThemeStyles from '@hooks/useThemeStyles';
import getButtonState from '@libs/getButtonState';
import CONST from '@src/CONST';
import type EmojiPickerMenuItemProps from './types';

function EmojiPickerMenuItem({emoji, onPress, onHoverIn, onHoverOut, onFocus, onBlur, isFocused, isHighlighted, isUsingKeyboardMovement}: EmojiPickerMenuItemProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const StyleUtils = useStyleUtils();
    const themeStyles = useThemeStyles();

    useEffect(() => {
        if (!isFocused) {
            return;
        }

        ref?.current?.focus();
    }, [isFocused]);

    return (
        <PressableWithoutFeedback
            shouldUseAutoHitSlop={false}
            onPress={() => onPress(emoji)}
            onHoverIn={onHoverIn}
            onHoverOut={onHoverOut}
            onFocus={onFocus}
            onBlur={onBlur}
            ref={ref}
            style={({pressed}) => [
                StyleUtils.getButtonBackgroundColorStyle(getButtonState(false, pressed)),
                isHighlighted && isUsingKeyboardMovement ? themeStyles.emojiItemKeyboardHighlighted : {},
                isHighlighted && !isUsingKeyboardMovement ? themeStyles.emojiItemHighlighted : {},
                themeStyles.emojiItem,
            ]}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            accessibilityLabel={emoji!}
            role={CONST.ROLE.BUTTON}
        >
            <Text style={[themeStyles.emojiText]}>{emoji}</Text>
        </PressableWithoutFeedback>
    );
}

// Significantly speeds up re-renders of the EmojiPickerMenu's FlatList
// by only re-rendering at most two EmojiPickerMenuItems that are highlighted/un-highlighted per user action.
export default React.memo(EmojiPickerMenuItem);
