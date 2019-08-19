const funlet = require('./funlet-call-me');
const Twilio = require('twilio');

const PHONE_NUMBER="415-555-1212";
const DEFAULT_PHONE_NUMBER="";

const TIMEOUT_STRING="42";
const TIMEOUT=42;
const DEFAULT_TIMEOUT=20;

const WHISPER=true;
const NO_WHISPER=false;

const FROM_NUMBER="+19165550123";
const SPELLED_FROM_NUMBER="+. 1. 9. 1. 6. 5. 5. 5. 0. 1. 2. 3. ";

const RECORDED_MESSAGE="https://example.com/recorded-message.mp3";
const TEXT_MESSAGE="Text message";
const MESSAGE=TEXT_MESSAGE;
const DEFAULT_MESSAGE=
  'You are receiving a call from '+SPELLED_FROM_NUMBER+'. '+
  'Press any key to accept.';

const ENGLISH="en";
const FRENCH="fr";
const DEFAULT_LANGUAGE=ENGLISH;

const MAN="man";
const WOMAN="woman";
const ALICE="alice";
const DEFAULT_VOICE=ALICE;

const NO_DIGITS = null;
const EMPTY_DIGITS="";
const NON_EMPTY_DIGITS="5";

const DIAL_DONE = true;
const DIAL_NOT_DONE = false;

const NO_CALL_STATUS="";
const CALL_ANSWERED="answered";
const CALL_COMPLETED="completed";
const CALL_BUSY="busy";

const FALLBACK_URL="https://example.com/please-try-later.mp3";
const FALLBACK_URL_ENCODED="https%3A%2F%2Fexample.com%2Fplease-try-later.mp3";
const DEFAULT_FALLBACK_URL="";

test('[CALLME-INPUT-PHONE-NUMBER-1] Read Phone Number from Event',
() => {
  expect(
    funlet.input.getPhoneNumber({}, {PhoneNumber:PHONE_NUMBER})
  ).toEqual( PHONE_NUMBER );
});

test('[CALLME-INPUT-PHONE-NUMBER-2] Read Phone Number from Environment',
() => {
  expect(
    funlet.input.getPhoneNumber({FUNLET_CALLME_PHONE_NUMBER:PHONE_NUMBER}, {})
  ).toEqual( PHONE_NUMBER );
});

test('[CALLME-INPUT-PHONE-NUMBER-3] Read Default Phone Number from Script',
() => {
  expect(
    funlet.input.getPhoneNumber({}, {})
  ).toEqual( DEFAULT_PHONE_NUMBER );
});

test('[CALLME-INPUT-TIMEOUT-1] Read Timeout from Event',
() => {
  expect(
    funlet.input.getTimeout({}, {Timeout:TIMEOUT_STRING})
  ).toEqual( TIMEOUT );
});

test('[CALLME-INPUT-TIMEOUT-2] Read Timeout from Environment',
() => {
  expect(
    funlet.input.getTimeout({FUNLET_CALLME_TIMEOUT:TIMEOUT_STRING}, {})
  ).toEqual( TIMEOUT );
});

test('[CALLME-INPUT-TIMEOUT-3] Read Default Timeout from Script',
() => {
  expect(
    funlet.input.getTimeout({}, {})
  ).toEqual( DEFAULT_TIMEOUT );
});

test('[CALLME-INPUT-DIAL-0] Read No Whisper from Event',
() => {
  expect(
    funlet.input.isWhisper({}, {})
  ).toEqual( NO_WHISPER );
});

test('[CALLME-INPUT-DIAL-1] Read Whisper from Event',
() => {
  expect(
    funlet.input.isWhisper({}, {Whisper:"true"})
  ).toEqual( WHISPER );
});

test('[CALLME-INPUT-MESSAGE-1] Read Message from Event',
() => {
  expect(
    funlet.input.getMessage({}, {Message:MESSAGE})
  ).toEqual( MESSAGE );
});

test('[CALLME-INPUT-MESSAGE-2] Read Message from Environment',
() => {
  expect(
    funlet.input.getMessage({FUNLET_CALLME_MESSAGE:MESSAGE}, {})
  ).toEqual( MESSAGE );
});

test('[CALLME-INPUT-MESSAGE-3] '+
     'Read Default Message from Script (with number in From parameter)',
() => {
  expect(
    funlet.input.getMessage({}, {From:FROM_NUMBER})
  ).toEqual( DEFAULT_MESSAGE );
});

test('[CALLME-INPUT-MESSAGE-4] '+
     'Read Default Message from Script (with number in Caller parameter)',
() => {
  expect(
    funlet.input.getMessage({}, {Caller:FROM_NUMBER})
  ).toEqual( DEFAULT_MESSAGE );
});

test('[CALLME-INPUT-LANGUAGE-1] Read Language from Event',
() => {
  expect(
    funlet.input.getLanguage({}, {Language:FRENCH})
  ).toEqual( FRENCH );
});

test('[CALLME-INPUT-LANGUAGE-2] Read Language from Environment',
() => {
  expect(
    funlet.input.getLanguage({FUNLET_CALLME_LANGUAGE:FRENCH}, {})
  ).toEqual( FRENCH );
});

test('[CALLME-INPUT-LANGUAGE-3] Read Default Language from Script',
() => {
  expect(
    funlet.input.getLanguage({}, {})
  ).toEqual( DEFAULT_LANGUAGE );
});

test('[CALLME-INPUT-VOICE-1] Read Voice from Event',
() => {
  expect(
    funlet.input.getVoice({}, {Voice:MAN})
  ).toEqual( MAN );
});

test('[CALLME-INPUT-VOICE-2] Read Voice from Environment',
() => {
  expect(
    funlet.input.getVoice({FUNLET_CALLME_VOICE:WOMAN}, {})
  ).toEqual( WOMAN );
});

test('[CALLME-INPUT-VOICE-3] Read Default Voice from Script',
() => {
  expect(
    funlet.input.getVoice({}, {})
  ).toEqual( DEFAULT_VOICE );
});

test('[CALLME-INPUT-HUMAN-CHECK-1] Read Human Check from Event',
() => {
  expect(
    funlet.input.isHumanCheckRequired({}, {HumanCheck:"true"})
  ).toEqual( true );
});

test('[CALLME-INPUT-HUMAN-CHECK-2] Read Human Check from Environment',
() => {
  expect(
    funlet.input.isHumanCheckRequired({FUNLET_CALLME_HUMAN_CHECK:"true"}, {})
  ).toEqual( true );
});

test('[CALLME-INPUT-HUMAN-CHECK-3] Read Default Human Check from Script',
() => {
  const DEFAULT_HUMAN_CHECK = false;
  expect(
    funlet.input.isHumanCheckRequired({}, {})
  ).toEqual( DEFAULT_HUMAN_CHECK );
});

test('[CALLME-INPUT-DIGITS-0] Read No Digits from Event',
() => {
  expect(
    funlet.input.getDigits({},{})
  ).toEqual( NO_DIGITS );
});

test('[CALLME-INPUT-DIGITS-1] Read Empty Digits from Event',
() => {
  expect(
    funlet.input.getDigits({},{Digits:EMPTY_DIGITS})
  ).toEqual( EMPTY_DIGITS );
});

test('[CALLME-INPUT-DIGITS-2] Read Non-Empty Digits from Event',
() => {
  expect(
    funlet.input.getDigits({},{Digits:NON_EMPTY_DIGITS})
  ).toEqual( NON_EMPTY_DIGITS );
});

test('[CALLME-INPUT-DIAL-0] Read No Dial from Event',
() => {
  expect(
    funlet.input.isDialDone({}, {})
  ).toEqual( DIAL_NOT_DONE );
});

test('[CALLME-INPUT-DIAL-1] Read Dial from Event',
() => {
  expect(
    funlet.input.isDialDone({}, {Dial:"true"})
  ).toEqual( DIAL_DONE );
});

test('[CALLME-INPUT-CALL-STATUS-0] Read No Call Status from Event',
() => {
  expect(
    funlet.input.getCallStatus({}, {})
  ).toEqual( NO_CALL_STATUS );
});

test('[CALLME-INPUT-CALL-STATUS-1] Read Answered Call Status from Event',
() => {
  expect(
    funlet.input.getCallStatus({}, {DialStatus:CALL_ANSWERED})
  ).toEqual( CALL_ANSWERED );
});

test('[CALLME-INPUT-CALL-STATUS-2] Read Completed Call Status from Event',
() => {
  expect(
    funlet.input.getCallStatus({}, {DialCallStatus:CALL_COMPLETED})
  ).toEqual( CALL_COMPLETED );
});

test('[CALLME-INPUT-CALL-STATUS-3] Read Busy Call Status from Event',
() => {
  expect(
    funlet.input.getCallStatus({}, {DialCallStatus:CALL_BUSY})
  ).toEqual( CALL_BUSY );
});

test('[CALLME-INPUT-FALLBACK-URL-1] Read Fallback URL from Event',
() => {
  expect(
    funlet.input.getFallbackUrl({}, {FailUrl:FALLBACK_URL})
  ).toEqual( FALLBACK_URL );
});

test('[CALLME-INPUT-FALLBACK-URL-2] Read Fallback URL from Environment',
() => {
  expect(
    funlet.input.getFallbackUrl({FUNLET_CALLME_FALLBACK_URL:FALLBACK_URL}, {})
  ).toEqual( FALLBACK_URL );
});

test('[CALLME-INPUT-FALLBACK-URL-3] Read Default Fallback URL from Script',
() => {
  expect(
    funlet.input.getFallbackUrl({}, {})
  ).toEqual( DEFAULT_FALLBACK_URL );
});


test.skip('Missing Tests', done => {
  const callback = (err, result) => {
    expect( result ).toBeInstanceOf( Twilio.twiml.VoiceResponse );
    expect( result.toString() ).toEqual( '...' );
    done();
  };
  funlet.handler({}, {}, callback);
});
