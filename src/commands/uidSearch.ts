import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import uidSearch_core from '../core/uidSearch_core';

export const data = new SlashCommandBuilder()
    .setName('uidsearch')
    .setDescription('uid로 개척자 검색')

    .addIntegerOption((Option) => Option.setName("uid")
    .setDescription("스타레일 uid를 적어주세요: ")
    .setRequired(true))


export async function execute(interaction: ChatInputCommandInteraction) {
    uidSearch_core(interaction);
}