import * as selectors from './selectors/';
import * as helpers from './helpers/';
import * as actions from './actions/';
import * as reducers from './reducers/';
import TypeAddAnother, {
    TypeAddAnotherPreview,
} from './components/TypeAddAnother';
import TypeFieldset from './components/TypeFieldset';
import TypeFollowUp from './components/TypeFollowUp';
import TypeInputField, {
    TypeInputFieldPreview,
} from './components/TypeInputField';
import TypeListbox, { TypeListboxPreview } from './components/TypeListbox';
import TypeMarkup from './components/TypeMarkup';
import TypeSelectionHybrid, {
    TypeSelectionHybridPreview,
} from './components/TypeSelectionHybrid';
import TypeTableFormat, {
    TypeTableFormatPreview,
} from './components/TypeTableFormat';
import TypeTextarea, { TypeTextareaPreview } from './components/TypeTextarea';
import TypeHidden from './components/TypeHidden';
import TypeAddInputs, {
    TypeAddInputsPreview,
} from './components/TypeAddInputs';
import TypeTagInput, { TypeTagInputPreview } from './components/TypeTagInput';
import FormUserVerify from './components/FormUserVerify';
import WebForm, {
    withContext as WebFormWithContext,
} from './components/WebForm';

const QuestionTypes = {
    TypeAddAnother,
    TypeAddAnotherPreview,
    TypeFieldset,
    TypeFollowUp,
    TypeInputField,
    TypeInputFieldPreview,
    TypeListbox,
    TypeListboxPreview,
    TypeMarkup,
    TypeSelectionHybrid,
    TypeSelectionHybridPreview,
    TypeTableFormat,
    TypeTableFormatPreview,
    TypeTextarea,
    TypeTextareaPreview,
    TypeHidden,
    TypeAddInputs,
    TypeAddInputsPreview,
    TypeTagInput,
    TypeTagInputPreview,
};

export {
    helpers,
    selectors,
    actions,
    reducers,
    WebForm,
    WebFormWithContext,
    FormUserVerify,
    QuestionTypes,
};
